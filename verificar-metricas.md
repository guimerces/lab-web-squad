# Verificando Métricas no Grafana

## Configuração Inicial do Grafana

### 1. Primeira Configuração

1. Acesse http://localhost:9091
2. Login: `admin` / `admin`
3. Navegue até **Configuration** → **Data Sources**
4. Clique em **Add data source** → **Prometheus**
5. Em **URL**, digite: `http://prometheus:9090`
6. Clique em **Save & Test**

### 2. Criar Dashboard

1. Vá em **Dashboards** → **New Dashboard** → **Add Visualization**
2. Selecionar datasource: **Prometheus**
3. No campo **Metrics browser**, digite uma das queries abaixo

### Queries Úteis

#### Total de Requisições
```
sum(http_requests_total)
```

#### Taxa de Erro (%)
```
(sum(rate(http_requests_total{status="500"}[5m])) / sum(rate(http_requests_total[5m]))) * 100
```

#### Taxa de Sucesso (%)
```
(sum(rate(http_requests_total{status="200"}[5m])) / sum(rate(http_requests_total[5m]))) * 100
```

#### Latência p95 (segundos)
```
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

#### Requisições por Status (Time Series)
```
sum by (status) (rate(http_requests_total[5m]))
```

#### Latência por Percentil
```
histogram_quantile(0.50, rate(http_request_duration_seconds_bucket[5m]))
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))
```

## Testando

1. No frontend (http://localhost:3000), gere algumas requisições
2. Volte ao Grafana e observe as métricas atualizando em tempo real

