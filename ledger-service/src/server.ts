import { initializeTelemetry } from './telemetry';

// IMPORTANTE: Inicializar telemetria ANTES de importar Express
const shutdownTelemetry = initializeTelemetry();

import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from './logger';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

// Simula processamento de extrato com latência variável
app.post('/process', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const { type } = req.body;
  
  logger.info('Processando extrato no ledger', { type });
  
  // Simula latência de processamento
  const latency = type === 'success' ? 50 : type === 'error' ? 20 : Math.random() * 100 + 50;
  await new Promise(resolve => setTimeout(resolve, latency));

  if (type === 'error') {
    logger.error('Erro ao processar no ledger', { type, latency: Date.now() - startTime });
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao processar extrato no ledger' 
    });
    return;
  }

  const totalLatency = Date.now() - startTime;
  logger.info('Extrato processado com sucesso', { type, latency: totalLatency });
  
  res.json({ 
    success: true, 
    message: 'Extrato processado com sucesso',
    transactionId: Math.random().toString(36).substring(7),
    processedAt: new Date().toISOString()
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'ledger-service' });
});

app.listen(PORT, () => {
  logger.info('Ledger Service iniciado', { port: PORT });
});

process.on('SIGTERM', () => {
  shutdownTelemetry();
  process.exit(0);
});

