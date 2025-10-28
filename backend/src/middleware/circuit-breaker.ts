import { CircuitBreakerState } from '../types';
import logger from '../logger';

export class CircuitBreaker {
  private isOpen: boolean = false;
  private failureCount: number = 0;
  private lastFailureTime: Date | null = null;
  private totalRequests: number = 0;
  private successfulRequests: number = 0;
  private failedRequests: number = 0;

  // Configuração: abre após 3 falhas consecutivas, aguarda 5s antes de tentar novamente
  private readonly FAILURE_THRESHOLD = 3;
  private readonly TIMEOUT_MS = 5000;

  constructor() {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.totalRequests++;

    // Se o circuit breaker está aberto, verifica se já passou o timeout
    if (this.isOpen) {
      if (
        this.lastFailureTime &&
        Date.now() - this.lastFailureTime.getTime() > this.TIMEOUT_MS
      ) {
        // Timeout expirado, tenta novamente (half-open state)
        this.isOpen = false;
        logger.warn('Circuit Breaker: Half-Open - Tentando recuperação', { failureCount: this.failureCount });
      } else {
        // Circuit breaker ainda aberto, retorna erro imediatamente
        logger.error('Circuit Breaker: Open - Bloqueando requisição');
        throw new Error('Circuit breaker is open. Service unavailable.');
      }
    }

    try {
      const result = await fn();
      // Sucesso: reseta contador de falhas
      this.failureCount = 0;
      this.successfulRequests++;
      this.isOpen = false; // Fecha o circuit breaker se estava aberto
      return result;
    } catch (error) {
      this.failureCount++;
      this.failedRequests++;
      this.lastFailureTime = new Date();

      // Se atingiu o threshold, abre o circuit breaker
      if (this.failureCount >= this.FAILURE_THRESHOLD) {
        this.isOpen = true;
        logger.error('Circuit Breaker: Open - Muitas falhas consecutivas', { 
          failureCount: this.failureCount,
          threshold: this.FAILURE_THRESHOLD 
        });
      }

      throw error;
    }
  }

  getState(): CircuitBreakerState {
    return {
      isOpen: this.isOpen,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime?.toISOString() || null,
      totalRequests: this.totalRequests,
      successfulRequests: this.successfulRequests,
      failedRequests: this.failedRequests,
    };
  }

  reset(): void {
    this.isOpen = false;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.totalRequests = 0;
    this.successfulRequests = 0;
    this.failedRequests = 0;
  }
}

