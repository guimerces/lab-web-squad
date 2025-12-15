# Atividade 1 - Hello World com API Route

Este é um projeto simples criado com **Next.js**, que exibe uma página “Hello World” e uma **API Route** que retorna uma mensagem em formato JSON.

---

## Alunos da Squad:
- Guilherme Antonio Merces Silva
- Iasmim da Cruz Marinho
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
   git clone -b atividade1 https://github.com/guimerces/lab-web-squad.git
   ```

2. Depois de clonar, abra o Command Prompt e navegue até a pasta do projeto:

   ```bash
   cd lab-web-squad 
   ```
   ```bash
   cd hello-world
   ```

3. Se não tiver instalado, instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra no navegador:

   ```
   http://localhost:3000
   ```

---

## Rotas principais

| Rota         | Descrição                                        |
| ------------ | ------------------------------------------------ |
| `/`          | Página inicial exibindo “Hello World!”           |
| `/api/hello` | Rota de API que retorna um JSON com uma mensagem |
