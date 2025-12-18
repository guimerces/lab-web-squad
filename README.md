# Atividade 3 - Estruturação Atomic Design + Tela de Cadastro de Usuários com API Routes

Este projeto foi desenvolvido utilizando **Next.js (App Router)** e tem como objetivo implementar uma **tela de cadastro de usuários** seguindo o padrão **Atomic Design**, com **integração inicial às API Routes do Next.js**.

---

## Alunos da Squad
- Eduardo Augusto Barros Coutinho  
- Guilherme Antonio Merces Silva  
- Gustavo de Oliveira Ferreira  
- Iasmim da Cruz Marinho  
- Lávio Dias e Dias do Vale  
- Rafael Silva Santana  
- Stéfane Oliveira  

---

## Estrutura do Projeto

```
.
/src
|-- /app
|   |-- /api
|   |   |-- /usuarios
|   |      |-- route.ts
|   |   |-- /cadastro
|   |      |-- route.ts
|   |-- global.css
|   |-- layout.tsx       
|   |-- page.tsx
|
|-- /assets
|   |-- /images
|       |-- caderneta.png
|
|-- /components
|   |-- /atoms            
|   |   |-- button.tsx
|   |   |-- input.tsx
|   |   |-- label.tsx
|   |
|   |-- /molecules        
|   |   |-- formfield.tsx
|   |   |-- password-field.tsx
|   |
|   |-- /organisms    
|   |   |-- form.tsx
|   |
|   |-- /pages
|   |   |-- cadastro-page.tsx
|   |
|   |-- /templates    
|   |   |-- authlayout.tsx
|-- ...
```

---

## Como executar localmente

1. Clone este repositório:

   ```bash
   git clone -b atividade3 https://github.com/guimerces/lab-web-squad.git
   ```

2. Depois de clonar, abra o Command Prompt e navegue até a pasta do projeto:

   ```bash
   cd lab-web-squad 
   ```
   ```bash
   cd cadastro-usuario
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

| Rota             | Descrição                                                    |
| ---------------- | ------------------------------------------------------------ |
| `/`              | Página inicial da Ufbank                                     |
| `/cadastro`      | Tela de cadastro de usuários                                 |
| `/api/usuarios`  | API Route para cadastro e listagem de usuários (GET/POST)    |

