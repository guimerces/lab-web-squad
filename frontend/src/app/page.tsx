'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface CircuitBreakerState {
  circuitBreakerOpen: boolean;
}

interface TransactionResponse {
  success: boolean;
  message: string;
  timestamp: string;
  latency: number;
}

export default function Home() {
  const [circuitBreakerOpen, setCircuitBreakerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<TransactionResponse | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Auto-refresh circuit breaker state
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCircuitBreakerState();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchCircuitBreakerState = async () => {
    try {
      const response = await axios.get<CircuitBreakerState>(`${API_URL}/api/metrics`);
      setCircuitBreakerOpen(response.data.circuitBreakerOpen);
    } catch (error) {
      console.error('Erro ao buscar estado do circuit breaker:', error);
    }
  };

  const handleTransaction = async (type: 'success' | 'error' | 'chaos', failService?: 'api' | 'ledger' | 'notification') => {
    setLoading(true);
    setLastResult(null);

    try {
      const response = await axios.post<TransactionResponse>(
        `${API_URL}/api/transaction`,
        { type, failService }
      );
      setLastResult(response.data);
    } catch (error: any) {
      setLastResult({
        success: false,
        message: error.response?.data?.message || 'Erro ao processar transação',
        timestamp: new Date().toISOString(),
        latency: 0,
      });
    } finally {
      setLoading(false);
      fetchCircuitBreakerState();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">UFBank - Chaos Engineering Demo</h1>
          <p className="text-gray-300">
            Demonstração prática de Circuit Breaker Pattern e Chaos Engineering
          </p>
        </header>

        {/* Circuit Breaker Status */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Circuit Breaker</h2>
          
          <div className={`flex items-center justify-center p-8 rounded-lg ${
            circuitBreakerOpen 
              ? 'bg-red-900/30 border-2 border-red-500' 
              : 'bg-green-900/30 border-2 border-green-500'
          }`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{circuitBreakerOpen ? '🔴' : '🟢'}</div>
              <div className="text-3xl font-bold mb-2">
                {circuitBreakerOpen ? 'CIRCUIT BREAKER ABERTO' : 'CIRCUIT BREAKER FECHADO'}
              </div>
              <div className="text-lg text-gray-300">
                {circuitBreakerOpen 
                  ? 'Bloqueando requisições para proteger o sistema' 
                  : 'Sistema operando normalmente'}
              </div>
            </div>
          </div>
        </div>

        {/* Painel de Controle */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Simular Transações</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TransactionButton
                label="Sucesso"
                description="Sempre retorna sucesso"
                onClick={() => handleTransaction('success')}
                loading={loading}
                color="green"
              />
              <TransactionButton
                label="Erro Geral"
                description="Erro genérico"
                onClick={() => handleTransaction('error')}
                loading={loading}
                color="red"
              />
              <TransactionButton
                label="Chaos Mode"
                description="60% sucesso, 40% erro"
                onClick={() => handleTransaction('chaos')}
                loading={loading}
                color="yellow"
              />
            </div>
            
            <div className="border-t border-gray-600 pt-4">
              <h3 className="text-lg font-semibold mb-3">Simular Erros Específicos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TransactionButton
                  label="Erro na API"
                  description="Falha na API principal"
                  onClick={() => handleTransaction('success', 'api')}
                  loading={loading}
                  color="red"
                />
                <TransactionButton
                  label="Erro no Ledger"
                  description="Falha no serviço de ledger"
                  onClick={() => handleTransaction('success', 'ledger')}
                  loading={loading}
                  color="orange"
                />
                <TransactionButton
                  label="Erro em Notificações"
                  description="Falha no serviço de notificações"
                  onClick={() => handleTransaction('success', 'notification')}
                  loading={loading}
                  color="purple"
                />
              </div>
            </div>
          </div>

          {lastResult && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{lastResult.success ? '✅' : '❌'}</span>
                <span className="font-semibold">
                  {lastResult.success ? 'Sucesso' : 'Erro'}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{lastResult.message}</p>
              <div className="text-xs text-gray-400">
                <div>Latência: {lastResult.latency}ms</div>
                <div>{new Date(lastResult.timestamp).toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>

        {/* Instruções */}
        <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-500/30">
          <h3 className="text-xl font-semibold mb-3">Como Funciona o Circuit Breaker</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-200">
            <li>Clique em <strong>"Erro"</strong> 3 vezes consecutivas - o Circuit Breaker se abrirá (vermelho)</li>
            <li>Quando aberto, todas as requisições são bloqueadas imediatamente para proteger o sistema</li>
            <li>Aguarde ~5 segundos - o Circuit Breaker entra em modo "Half-Open" tentando se recuperar</li>
            <li>Enquanto isso, clique em "Sucesso" uma vez para recuperar o sistema</li>
            <li>Use <strong>"Chaos Mode"</strong> para simular falhas intermitentes reais</li>
          </ol>
          
          <div className="mt-4 p-4 bg-blue-800/30 rounded">
            <p className="text-sm">
              💡 <strong>Dica:</strong> Para ver todas as métricas detalhadas (disponibilidade, SLOs, error budgets), 
              acesse o <strong>Grafana</strong> em http://localhost:9091
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function TransactionButton({
  label,
  description,
  onClick,
  loading,
  color,
}: {
  label: string;
  description: string;
  onClick: () => void;
  loading: boolean;
  color: string;
}) {
  const colorClasses = {
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex-1 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <div className="text-2xl font-bold mb-2">{label}</div>
      <div className="text-sm opacity-90">{description}</div>
    </button>
  );
}
