# UFBank - Demonstração de Observabilidade e Chaos Engineering

Este projeto demonstra conceitos práticos de SRE (Site Reliability Engineering), incluindo Circuit Breaker Pattern, Chaos Engineering e Observabilidade completa (Métricas, Logs e Traces distribuídos).

## Arquitetura

O projeto é composto de:
- **Frontend**: Next.js 14 em modo desenvolvimento
- **Backend (API Gateway)**: Node.js + Express com Circuit Breaker
- **Ledger Service**: Microserviço de processamento de extratos
- **Notification Service**: Microserviço de notificações
- **Prometheus**: Coleta de métricas
- **Grafana**: Visualização de métricas e logs
- **Loki**: Armazenamento de logs
- **Jaeger**: Visualização de traces distribuídos

## Como Executar

```bash
docker compose up --build
```

Serviços disponíveis:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Prometheus: http://localhost:9090
- Grafana: http://localhost:9091
- Jaeger: http://localhost:16686

## Observabilidade

### Métricas (Prometheus + Grafana)
- Total de requisições
- Taxa de sucesso/erro
- Latência (p95, p99)
- Duração das requisições HTTP

### Logs (Loki + Grafana)
- Logs estruturados de todos os serviços
- Filtros por nível (info, warn, error)
- Queries: `{job="ufbank-api"}`, `{job="ledger-service"}`, `{job="notification-service"}`

### Traces (Jaeger)
- Rastreamento distribuído entre serviços
- Visualização da cadeia de requisições
- Identificação de gargalos

## Demonstração de Chaos Engineering

O frontend permite simular diferentes cenários:
- **Sucesso**: Sempre retorna sucesso
- **Erro Geral**: Erro genérico
- **Chaos Mode**: 60% sucesso, 40% erro
- **Erro na API**: Falha na API principal
- **Erro no Ledger**: Falha no serviço de processamento
- **Erro em Notificações**: Falha no serviço de notificações

O Circuit Breaker abre após 3 falhas consecutivas, protegendo o sistema.

## Documentação

- [Como Ver Logs](COMO-VER-LOGS.md)
- [Como Ver Traces](COMO-VER-TRACES.md)
- [Observabilidade Completa](OBSERVABILIDADE-COMPLETA.md)
- [Verificar Métricas](verificar-metricas.md)

---

## Alunos da Squad:
- Eduardo Augusto Barros Coutinho
- Guilherme Antonio Merces Silva
- Gustavo de Oliveira Ferreira
- Iasmim da Cruz Marinho
- Lávio Dias e Dias do Vale
- Rafael Silva Santana
- Stéfane Oliveira

## Atividades do Curso:
- [Atividade 1](https://github.com/guimerces/lab-web-squad/tree/atividade1)
- [Atividade 2](https://github.com/guimerces/lab-web-squad/tree/atividade2)
- [Parte prática do Seminário](https://github.com/guimerces/lab-web-squad/tree/seminario)
