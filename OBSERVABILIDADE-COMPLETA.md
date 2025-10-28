# 🎯 Observabilidade Completa - UFBank

## ✅ O que temos implementado

### 📊 1. Métricas (Prometheus + Grafana)
- ✅ **Prometheus** coletando métricas do backend
- ✅ **Grafana** visualizando métricas
- ✅ Métricas disponíveis:
  - Total de requisições
  - Taxa de sucesso/erro
  - Latência (p95, p99)
  - Duração das requisições HTTP
- 📍 **URLs**:
  - Prometheus: http://localhost:9090
  - Grafana: http://localhost:9091

### 📝 2. Logs (Winston + Loki + Grafana)
- ✅ **Winston** gerenciando logs estruturados no backend
- ✅ **Loki** armazenando logs
- ✅ **Grafana** visualizando logs
- ✅ Logs capturados:
  - Info: Processamento de transações
  - Error: Falhas no Circuit Breaker
  - Warn: Recuperação do Circuit Breaker
- 📍 **URL**: http://localhost:9091 (Explorar → Loki)
- 📍 **Query**: `{job="ufbank-api"}`

### 🔍 3. Traces (OpenTelemetry + Jaeger)
- ✅ **OpenTelemetry** instrumentando o backend
- ✅ **Jaeger** armazenando e visualizando traces
- ✅ **Grafana** integrado com Jaeger (opcional)
- ⚠️ **Observação**: Necessita rebuild do backend após configuração
- 📍 **URLs**:
  - Jaeger UI: http://localhost:16686
  - Grafana: http://localhost:9091 (Explore → Jaeger)

---

## 🚀 Como Usar

### Métricas
1. Acesse http://localhost:9091
2. Configure datasource Prometheus (já configurado automaticamente)
3. Crie ou use dashboard de métricas

### Logs
1. Acesse http://localhost:9091
2. Vá em **Explore** → selecione **Loki**
3. Digite: `{job="ufbank-api"}`
4. Veja logs em tempo real

### Traces
1. Reconstrua o backend: `docker compose up -d --build backend`
2. Faça requisições no frontend: http://localhost:3000
3. Veja traces em http://localhost:16686
4. Selecione serviço `ufbank-api` no Jaeger

---

## 📦 Stack Completo

| Componente | Tecnologia | Status |
|------------|-----------|--------|
| **Métricas** | Prometheus + Grafana | ✅ Funcional |
| **Logs** | Winston + Loki + Grafana | ✅ Funcional |
| **Traces** | OpenTelemetry + Jaeger | ⚠️ Aguardando rebuild |
| **Frontend** | Next.js 14 (dev mode) | ✅ Funcional |
| **Backend** | Node.js + Express | ✅ Funcional |
| **Circuit Breaker** | Pattern Implementado | ✅ Funcional |

---

## 🎯 Observabilidade = Trifeto

✅ **Métricas** (O QUÊ): Estatísticas e tendências
- Quantas requisições falharam?
- Qual a latência média?
- Qual a disponibilidade do sistema?

✅ **Logs** (O QUE ACONTECEU): Detalhes de eventos
- O que causou o erro?
- Qual a mensagem de erro exata?
- Quando ocorreu?

✅ **Traces** (COMO): Rastreamento distribuído
- Onde a requisição foi gastar tempo?
- Qual serviço está lento?
- Qual a sequência de chamadas?

---

## 🎓 Demonstração Completa

Este projeto demonstra:
1. **Chaos Engineering**: Injetar falhas controladas
2. **Circuit Breaker**: Proteção contra falhas
3. **Observabilidade**: Métricas, Logs e Traces funcionando
4. **SRE Concepts**: SLOs, Error Budgets, Resilência

**Tudo gratuito e open-source!** 🎉

