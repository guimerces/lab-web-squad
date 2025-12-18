# Atividade 5 - Tela de Cadastro de Valores das Máquinas

Este é um projeto simples criado com Next.js que cria uma tela de cadastro de valores da máquina de pagamento.

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
|   |-- /api
|   |   |-- /usuarios
|   |      |-- route.ts
|   |   |-- /maquininha
|   |      |-- route.ts
|   |   |-- /valores
|   |      |-- route.ts
|   |-- /cadastro
|   |   |-- page.tsx
|   |-- /maquininha
|   |   |-- page.tsx
|   |-- /valores
|   |   |-- page.tsx
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
|   |   |-- select.tsx
|   |
|   |-- /molecules        
|   |   |-- formfield.tsx
|   |   |-- password-field.tsx
|   |   |-- select-field.tsx
|   |
|   |-- /organisms    
|   |   |-- form.tsx
|   |   |-- maquininha-form.tsx
|   |   |-- valores-form.tsx
|   |
|   |-- /pages
|   |   |-- cadastro-page.tsx
|   |   |-- home-page.tsx
|   |   |-- maquininha-page.tsx
|   |   |-- valores-page.tsx
|   |
|   |-- /templates    
|   |   |-- authlayout.tsx
|-- ...
```

---

## Como executar localmente

1. Clone este repositório:

   ```bash
   git clone -b atividade5 https://github.com/guimerces/lab-web-squad.git
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

| Rota               | Descrição                                                                |
| ------------------ | ------------------------------------------------------------------------ |
| `/`                | Página inicial                                                           |
| `/cadastro`        | Página de cadastro de usuários                                           |
| `/maquininha`      | Página de cadastro de máquinas de pagamento                              |
| `/valores`           | Página de cadastro de valores de máquinas de pagamento                 |
| `/api/usuarios`    | API Route para cadastro e listagem de usuários (GET/POST)                |
| `/api/maquininhas` | API Route para cadastro e listagem de maquininhas (GET/POST)             |
| `/api/valores`     | API Route para cadastro e listagem de valores das maquininhas (GET/POST) |
