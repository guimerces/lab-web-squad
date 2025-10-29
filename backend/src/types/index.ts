export interface TransactionRequest {
  type: 'success' | 'error' | 'chaos';
  failService?: 'api' | 'ledger' | 'notification';
}

export interface TransactionResponse {
  success: boolean;
  message: string;
  timestamp: string;
  latency: number;
}

export interface CircuitBreakerState {
  isOpen: boolean;
  failureCount: number;
  lastFailureTime: string | null;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
}

export interface Metrics {
  totalRequests: number;
  successCount: number;
  errorCount: number;
  circuitBreakerOpen: boolean;
  availability: number;
  errorRate: number;
}

