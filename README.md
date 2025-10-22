# Atividade 2 - Estruturação Atomic Design + Tela de Cadastro de Usuários

Este é um projeto simples criado com **Next.js**, que utiliza o a estruturação atomic design junto com uma página de cadastro de usuário.

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
/src
|-- /app
|   |-- global.css
|   |-- layout.tsx       
|   |-- page.tsx 
|
|-- /components
|   |-- /atoms            
|   |   |-- button.tsx
|   |   |-- input.tsx
|   |   |-- label.tsx
|   |
|   |-- /molecules        
|   |   |-- formfield.tsx
|   |
|   |-- /organisms    
|   |   |-- form.tsx
|   |
|   |-- /templates    
|   |   |-- authlayout.tsx
```

---

## Como executar localmente

1. Clone este repositório:

   ```bash
   git clone https://github.com/guimerces/lab-web-squad.git
   cd cadastro-usuario
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

VERIFICAR SE PRECISA DE ROTA
| Rota         | Descrição                                        |
| ------------ | ------------------------------------------------ |
| `/`          | Página inicial exibindo “Hello World!”           |
| `/api/hello` | Rota de API que retorna um JSON com uma mensagem |