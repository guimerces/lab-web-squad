import express, { Request, Response } from 'express';
import cors from 'cors';
import { CircuitBreaker } from './middleware/circuit-breaker';
import { TransactionRequest, TransactionResponse, Metrics } from './types';
import { initializeTelemetry } from './telemetry';
import * as promClient from 'prom-client';
import logger from './logger';

// IMPORTANTE: Inicializar telemetria ANTES de importar axios
const shutdownTelemetry = initializeTelemetry();

import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  buckets: [0.1, 0.5, 1, 2, 5],
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// Circuit Breaker
const circuitBreaker = new CircuitBreaker();

// Chamar Ledger Service
async function callLedgerService(type: string, forceError: boolean = false) {
  const LEDGER_URL = process.env.LEDGER_SERVICE_URL || 'http://ledger-service:3002';
  
  try {
    const response = await axios.post(`${LEDGER_URL}/process`, { type, forceError });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro no Ledger Service');
    }
    throw new Error('Ledger Service indisponível');
  }
}

// Chamar Notification Service
async function callNotificationService(message: string, forceError: boolean = false) {
  const NOTIFICATION_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3003';

  try {
    const response = await axios.post(`${NOTIFICATION_URL}/send`, { message, forceError });
    return response.data;
  } catch (error: any) {
    logger.error('Erro ao chamar notification service', { forceError, error: error.message });
    // Se for erro forçado, propagar
    if (forceError) {
      throw error;
    }
    // Notificações podem falhar sem quebrar a transação (retorna undefined)
    logger.warn('Falha ao enviar notificação (não crítico)', { error: error.message });
    return undefined;
  }
}

// Endpoint de transações
app.post('/api/transaction', async (req: Request<{}, TransactionResponse, TransactionRequest>, res: Response) => {
  const startTime = Date.now();
  
  try {
    const { type, failService } = req.body;
    logger.info('Processando transação', { type, failService });

    // Simular erro na API principal
    if (failService === 'api') {
      throw new Error('Erro simulado na API principal');
    }

    const result = await circuitBreaker.execute(async () => {
      // Chamar Ledger Service
      const ledgerResult = await callLedgerService(type, failService === 'ledger');
      
      // Chamar Notification Service - se falhar e for erro forçado, propagar
      if (failService === 'notification') {
        await callNotificationService(`Transação ${type} processada`, true);
      } else {
        await callNotificationService(`Transação ${type} processada`, false);
      }
      
      return ledgerResult;
    });

    const latency = Date.now() - startTime;
    logger.info('Transação processada com sucesso', { type, latency });

    // Registrar métricas de sucesso
    httpRequestDuration.observe({ method: 'POST', route: '/api/transaction', status: '200' }, latency / 1000);
    httpRequestsTotal.inc({ method: 'POST', route: '/api/transaction', status: '200' });

    res.json({
      success: result.success,
      message: result.message,
      timestamp: new Date().toISOString(),
      latency,
    });
  } catch (error: any) {
    const latency = Date.now() - startTime;
    
    logger.error('Erro ao processar transação', { 
      error: error.message,
      latency 
    });

    // Registrar métricas de erro
    httpRequestDuration.observe({ method: 'POST', route: '/api/transaction', status: '500' }, latency / 1000);
    httpRequestsTotal.inc({ method: 'POST', route: '/api/transaction', status: '500' });

    res.status(500).json({
      success: false,
      message: error.message || 'Erro interno do servidor',
      timestamp: new Date().toISOString(),
      latency,
    });
  }
});

// Endpoint de estado do circuit breaker
app.get('/api/metrics', (req: Request, res: Response) => {
  const state = circuitBreaker.getState();
  
  res.json({
    circuitBreakerOpen: state.isOpen,
  });
});

// Endpoint Prometheus metrics
app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info('UFBank API iniciada', { 
    port: PORT,
    metricsEndpoint: `http://localhost:${PORT}/metrics`
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  shutdownTelemetry();
  process.exit(0);
});

