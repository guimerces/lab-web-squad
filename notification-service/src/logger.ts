import winston from 'winston';
import LokiTransport from 'winston-loki';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'notification-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new LokiTransport({
      host: process.env.LOKI_HOST || 'http://loki:3100',
      labels: { job: 'notification-service' },
      json: true,
      format: winston.format.json(),
    }),
  ],
});

export default logger;

