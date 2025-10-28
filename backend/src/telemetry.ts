import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import logger from './logger';

// Configuração básica da telemetria OpenTelemetry
// Em produção, você configuraria para enviar para Grafana Cloud/Loki/Tempo

export function initializeTelemetry() {
  const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://jaeger:4318/v1/traces',
    }),
    instrumentations: [getNodeAutoInstrumentations()],
    serviceName: 'ufbank-api',
  });

  sdk.start();
  logger.info('OpenTelemetry telemetria inicializada');
  
  return () => {
    sdk.shutdown();
  };
}

