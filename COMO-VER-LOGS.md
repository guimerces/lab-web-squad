# 📋 Como Visualizar Logs - UFBank

## 🎯 Localização dos Logs

## Grafana + Loki (Visualização Estruturada)

### Primeiro acesso:
1. Acesse http://localhost:9091
2. Login: `admin` / `admin`
3. Configure o datasource Loki:
   - Vá em **Configuration** → **Data Sources**
   - Clique em **Add data source** → **Loki** (ou selecione se já aparecer)
   - URL: `http://loki:3100`
   - Clique em **Save & Test**

### Visualizar logs no Grafana:
1. Vá em **Explore** (ícone de bússola no menu lateral)
2. Selecione datasource **Loki** (no dropdown no topo)
3. Digite a query: `{job="ufbank-api"}`
4. Clique em **Run query**

### Queries úteis:

- **Todos os logs**: `{job="ufbank-api"}`
- **Apenas erros**: `{job="ufbank-api"} |= "error"`
- **Circuit Breaker**: `{job="ufbank-api"} |= "Circuit Breaker"`
- **Transações**: `{job="ufbank-api"} |= "Transação"`

### Tipos de logs capturados:
- ✅ **Info**: Inicialização, transações bem-sucedidas
- ⚠️ **Warn**: Circuit Breaker em modo Half-Open
- 🔴 **Error**: Circuit Breaker aberto, falhas em transações
