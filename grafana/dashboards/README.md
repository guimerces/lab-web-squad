# Dashboards do Grafana

Para visualizar as métricas do UFBank, crie um dashboard manualmente no Grafana:

## Passo a Passo

1. Acesse http://localhost:9091
2. Login: `admin` / `admin`
3. Vá em **Dashboards** → **New Dashboard**

### Adicionar Painéis

Crie os seguintes painéis:

#### 1. Total de Requisições
- **Type**: Stat
- **Query**: `sum(http_requests_total)`

#### 2. Taxa de Erro (%)
- **Type**: Gauge
- **Query**: `(sum(rate(http_requests_total{status="500"}[5m])) / sum(rate(http_requests_total[5m]))) * 100`

#### 3. Taxa de Sucesso
- **Type**: Stat  
- **Query**: `(sum(rate(http_requests_total{status="200"}[5m])) / sum(rate(http_requests_total[5m]))) * 100`

#### 4. Latência p95
- **Type**: Time series
- **Query**: `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))`

#### 5. Requests por Status
- **Type**: Time series
- **Query**: `sum by (status) (rate(http_requests_total[5m]))`

## Métricas Disponíveis

- `http_requests_total` - Contador total de requisições
- `http_request_duration_seconds` - Histograma de latência
- `http_request_duration_seconds_bucket` - Buckets para percentis

