# Observabilidade Completa - UFBank

## O que temos implementado

### 1. Métricas (Prometheus + Grafana)
- **Prometheus** coletando métricas do backend e microserviços
- **Grafana** visualizando métricas
- **Métricas disponíveis**:
  - Total de requisições
  - Taxa de sucesso/erro
  - Latência (p95, p99)
  - Duração das requisições HTTP
- **URLs**:
  - Prometheus: http://localhost:9090
  - Grafana: http://localhost:9091

### 2. Logs (Winston + Loki + Grafana)
- **Winston** gerenciando logs estruturados em todos os serviços
- **Loki** armazenando logs
- **Grafana** visualizando logs
- **Logs capturados**:
  - Info: Processamento de transações
  - Error: Falhas no Circuit Breaker e em serviços
  - Warn: Recuperação do Circuit Breaker
- **URL**: http://localhost:9091 (Explorar → Loki)
- **Query**: `{job="ufbank-api"}` ou `{job="ledger-service"}` ou `{job="notification-service"}`

### 3. Traces (OpenTelemetry + Jaeger)
- **OpenTelemetry** instrumentando todos os serviços
- **Jaeger** armazenando e visualizando traces distribuídos
- **Traces distribuídos**:
  - ufbank-api: Serviço principal
  - ledger-service: Processamento de extratos
  - notification-service: Envio de notificações
- **URLs**:
  - Jaeger UI: http://localhost:16686
  - Grafana: http://localhost:9091 (Explore → Jaeger)

---

## Como Usar

### Métricas
1. Acesse http://localhost:9091
2. Configure datasource Prometheus (já configurado automaticamente)
3. Crie ou use dashboard de métricas

### Logs
1. Acesse http://localhost:9091
2. Vá em **Explore** → selecione **Loki**
3. Digite: `{job="ufbank-api"}` ou o serviço desejado
4. Veja logs em tempo real

### Traces
1. Faça requisições no frontend: http://localhost:3000
2. Veja traces em http://localhost:16686
3. Selecione o serviço desejado no Jaeger (`ufbank-api`, `ledger-service`, `notification-service`)

---

## Stack Completo

| Componente | Tecnologia
|------------|-----------
| **Métricas** | Prometheus + Grafana
| **Logs** | Winston + Loki + Grafana
| **Traces** | OpenTelemetry + Jaeger
| **Frontend** | Next.js 14 (dev mode)
| **Backend** | Node.js + Express
| **Circuit Breaker** | Pattern Implementado
| **Microserviços** | Ledger Service, Notification Service

---

## Observabilidade = Trifeto

**Métricas** (O QUÊ): Estatísticas e tendências
- Quantas requisições falharam?
- Qual a latência média?
- Qual a disponibilidade do sistema?

**Logs** (O QUE ACONTECEU): Detalhes de eventos
- O que causou o erro?
- Qual a mensagem de erro exata?
- Quando ocorreu?

**Traces** (COMO): Rastreamento distribuído
- Onde a requisição gastou tempo?
- Qual serviço está lento?
- Qual a sequência de chamadas?

---

## Demonstração Completa

Este projeto demonstra:
1. **Chaos Engineering**: Injetar falhas controladas
2. **Circuit Breaker**: Proteção contra falhas
3. **Observabilidade**: Métricas, Logs e Traces funcionando
4. **Microserviços**: Traces distribuídos entre múltiplos serviços
5. **SRE Concepts**: SLOs, Error Budgets, Resilência

**Tudo gratuito e open-source!**

---

## Arquitetura

```
Frontend (Next.js)
    ↓
Backend (Express + Circuit Breaker)
    ↓
    ├─→ Ledger Service (Processamento)
    └─→ Notification Service (Notificações)
```

Cada serviço envia:
- Métricas → Prometheus
- Logs → Loki  
- Traces → Jaeger
