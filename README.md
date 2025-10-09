# Atividade 1 - Hello World com API Route

Este é um projeto simples criado com **Next.js**, que exibe uma página “Hello World” e uma **API Route** que retorna uma mensagem em formato JSON.

---

## Alunos da Squad:
- Iasmin da Cruz Marinho
- Guilherme Antonio Merces Silva
- Rafael Silva Santana
- Stéfane Oliveira

---

## Estrutura do projeto

```
.
├── app/
│   ├── api/
│   │   └── hello/
│   │       └── route.js     # Rota da API
│   └── page.js               # Página principal "Hello World"
├── package.json
├── README.md
└── ...
```

---

## Como executar localmente

1. Clone este repositório:

   ```bash
   git clone https://github.com/guimerces/lab-web-squad.git
   cd hello-world
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra no navegador:

   ```
   http://localhost:3000
   ```

---

## Rotas principais

| Rota         | Descrição                                        |
| ------------ | ------------------------------------------------ |
| `/`          | Página inicial exibindo “Hello World!”           |
| `/api/hello` | Rota de API que retorna um JSON com uma mensagem |