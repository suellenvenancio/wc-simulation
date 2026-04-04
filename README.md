# WC Simulation (World Cup Web App)

Uma aplicação web desenvolvida para interagir com a API do **WC App**, permitindo aos usuários acompanhar e simular resultados de jogos de campeonatos de futebol, como a Copa do Mundo.

## 🚀 Tecnologias Utilizadas

A aplicação frontend foi construída com foco em performance e uma interface moderna, utilizando as seguintes tecnologias:

- **[Next.js 16](https://nextjs.org/)** & **[React 19](https://react.dev/)** - Framework React para renderização e estruturação da UI.
- **[TypeScript](https://www.typescriptlang.org/)** - Para tipagem estática e maior segurança no código.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilização rápida e utilitária.
- **[SWR](https://swr.vercel.app/)** - Para data fetching, cache e mutação de dados da API.
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Para notificações interativas e feedback visual ao usuário.
- **[JWT Decode](https://github.com/auth0/jwt-decode)** - Para manipular e decodificar tokens JWT no client-side.
- **[Biome](https://biomejs.dev/)** - Ferramenta unificada para linting e formatação de código.

## 📦 Estrutura do Projeto

O projeto adota a arquitetura e sistema de roteamento do **App Router** do Next.js.

- `/app` - Onde a mágica acontece. Contém as rotas da aplicação:
  - `/(public)` - Páginas públicas acessíveis sem autenticação (ex: `login`, `create-account`).
  - `/(private)` - Páginas que exigem autenticação do usuário. Inclui as rotas para vizualização de `groups` (grupos), `matches` (partidas) e `simulate` (simulação de jogos).
- `/components` - Componentes React reutilizáveis pela interface.
- `/hooks` - Custom hooks (ex: integração com SWR ou lógica de estado).
- `/context` - Contextos globais do React, como o gerenciamento de autenticação do usuário.
- `/service` - Lógica de conexão e chamadas HTTP com a API backend (`wc-app/api`).
- `/utils` - Funções e utilitários de suporte.

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 20+ recomendada).
- Gerenciador de pacotes (Yarn, NPM, pnpm ou bun).
- A API Backend (`wc-app/api`) rodando localmente na porta correspondente para que os dados sejam consumidos corretamente.

### Passos para rodar localmente

1. **Vá para a pasta do frontend:**
   ```bash
   cd web/wc-simulation
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   # ou npm install / pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` ou `.env.local` na raiz contendo a URL da API, por exemplo:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3333"
   ```

4. **Execute a aplicação em modo de desenvolvimento:**
   ```bash
   yarn dev
   # ou npm run dev
   ```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🔒 Autenticação e Rotas

A aplicação utiliza um sistema de rotas públicas e privadas gerenciadas pelo middleware do Next.js (`middleware.ts`). Para acessar as páginas como Grupos e Simulações, é necessário criar uma conta e realizar o login, onde o token JWT será tratado.

 
