# 📊 Como Visualizar Traces - UFBank (Jaeger)

## 🎯 O que são Traces?

Traces (rastreamento distribuído) mostram o caminho completo de uma requisição através do sistema, incluindo:
- Todos os serviços visitados
- Tempo gasto em cada operação
- Erros e exceções
- Dependências entre serviços

---

## ✅ O que temos implementado

- ✅ **OpenTelemetry**: Instrumentação automática do Express
- ✅ **Jaeger**: Armazenamento e visualização de traces
- ✅ **Grafana**: Interface para explorar traces (opcional)

---

## 🔍 Como Visualizar Traces

### Opção 1: Jaeger UI (Interface Nativa)

1. **Acesse**: http://localhost:16686
2. **Selecione o serviço**: `ufbank-api` no dropdown
3. **Clique em "Find Traces"**

Você verá todos os traces capturados!

### Opção 2: Grafana (Integração)

1. Acesse http://localhost:9091
2. Login: `admin` / `admin`
3. Vá em **Configuration** → **Data Sources**
4. Se Jaeger aparecer automaticamente, está pronto!
5. Se não, clique em **Add data source** → **Jaeger**
   - URL: `http://jaeger:16686`
   - Clique em **Save & Test**
6. Vá em **Explore** e selecione datasource **Jaeger**

---

## 🧪 Gerar Traces

Para gerar traces, basta fazer requisições no frontend:
1. Acesse http://localhost:3000
2. Clique nos botões (Sucesso, Erro, Chaos Mode)
3. Volte ao Jaeger para ver os traces sendo capturados

---

## 📊 Exemplo de Trace no Jaeger

Quando você visualiza um trace, você verá:

```
POST /api/transaction
  ├─ express.middleware (setup)
  ├─ express.middleware (cors)
  ├─ express.middleware (jsonParser)
  ├─ POST /api/transaction (handler)
  │   ├─ circuitBreaker.execute (50ms)
  │   │   └─ simulateLedgerService (150ms)
  │   └─ response.write (1ms)
  └─ response.end
```

**Total**: 200ms

---

## 🔍 O que você pode fazer no Jaeger

- 📈 **Service Overview**: Ver estatísticas de cada serviço
- 🔍 **Search**: Buscar traces por serviço, operação, tags
- 📊 **Trace Details**: Ver detalhes completos de cada span
- ⏱️ **Timeline**: Analisar tempo gasto em cada operação
- 🔴 **Errors**: Identificar onde ocorreram erros

---

## 🎯 Benefícios

- ✅ **Visualização clara**: Veja exatamente onde o tempo é gasto
- ✅ **Debug rápido**: Identifique gargalos instantaneamente
- ✅ **Análise de erros**: Veja a sequência completa até o erro
- ✅ **Performance**: Identifique operações lentas
- ✅ **Interface intuitiva**: Jaeger UI é muito fácil de usar

---

## 🔗 Integração Completa

Agora você tem o **trifeto da observabilidade**:

- 📊 **Métricas** (Prometheus + Grafana): Estatísticas e tendências
- 📝 **Logs** (Loki + Grafana): Detalhes de eventos
- 🔍 **Traces** (Jaeger): Rastreamento distribuído

Tudo funcionando junto para observabilidade completa! 🎉
