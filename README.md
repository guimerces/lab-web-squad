# Atividade 2 - Estruturação Atomic Design + Tela de Cadastro de Usuários

Este é um projeto simples criado com **Next.js**, que utiliza o a estruturação atomic design junto com uma página de cadastro de usuário.

---

## Alunos da Squad:
- Eduardo Augusto Barros Coutinho
- Guilherme Antonio Merces Silva
- Gustavo de Oliveira Ferreira
- Iasmim da Cruz Marinho
- Lávio Dias e Dias do Vale
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
   git clone -b atividade2 https://github.com/guimerces/lab-web-squad.git
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

| Rota         | Descrição                                        |
| ------------ | ------------------------------------------------ |
| `/`          | Página de cadastro de usuários                   |
