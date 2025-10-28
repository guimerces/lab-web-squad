import { initializeTelemetry } from './telemetry';

// IMPORTANTE: Inicializar telemetria ANTES de importar Express
const shutdownTelemetry = initializeTelemetry();

import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from './logger';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3003;

app.post('/send', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const { message } = req.body;
  
  logger.info('Enviando notificação', { message });
  
  // Simula envio de notificação
  const latency = Math.random() * 50 + 20;
  await new Promise(resolve => setTimeout(resolve, latency));

  const totalLatency = Date.now() - startTime;
  logger.info('Notificação enviada', { message, latency: totalLatency });
  
  res.json({ 
    success: true, 
    message: 'Notificação enviada com sucesso',
    sentAt: new Date().toISOString()
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'notification-service' });
});

app.listen(PORT, () => {
  logger.info('Notification Service iniciado', { port: PORT });
});

process.on('SIGTERM', () => {
  shutdownTelemetry();
  process.exit(0);
});

