# 🏢 My Companies - Teste Técnico HubLocal

Este repositório contém a implementação do teste técnico para desenvolvedor Full Stack solicitado pela HubLocal. A aplicação consiste em uma plataforma para gerenciamento de empresas e seus respectivos locais, com autenticação de usuários.

## 📅 Entrega

**Data de entrega:** 01/05/2025

---

## 📚 Índice

- [🎯 Funcionalidades](#-funcionalidades)
- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📦 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Como Rodar o Projeto](#-como-rodar-o-projeto)
- [🧪 Testes](#-testes)
- [🧱 Arquitetura e Princípios](#-arquitetura-e-princípios)
- [🔐 Autenticação](#-autenticação)
- [🔄 Fluxo de Telas](#-fluxo-de-telas)
- [📄 Licença](#-licença)

---

## 🎯 Funcionalidades

### Backend (NestJS + Prisma + PostgreSQL)

- Cadastro e login de usuários com autenticação JWT.
- CRUD de empresas (Nome, Website, CNPJ).
- CRUD de locais associados às empresas (Nome, Endereço completo, etc.).
- Validação e autenticação em todas as rotas privadas.
- Migrations e validação com Prisma.

### Frontend (Next.js + Zustand + MUI)

- Tela de login e registro de usuários.
- Listagem de empresas do usuário logado.
- Modal para criar, editar e excluir empresas.
- Visualização dos locais de uma empresa.
- Modal para criar, editar e excluir locais.
- Máscara de CNPJ e validações de formulários.
- Persistência de estado com Zustand.
- Feedbacks com `react-toastify`.

---

## 🛠 Tecnologias Utilizadas

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) (validações)

### Backend

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

---

## 📦 Estrutura do Projeto

🧪 Testes
Testes unitários criados para os principais casos de uso.

Garantia de comportamento esperado para os serviços do backend.

Testes cobrem autenticação, manipulação de empresas e locais.

🧱 Arquitetura e Princípios
A aplicação foi estruturada seguindo os princípios do SOLID, garantindo um código limpo, testável e de fácil manutenção:

Separação de responsabilidades entre serviços, repositórios e controladores.

Injeção de dependências via @nestjs/common.

Backend dividido em camadas bem definidas para facilitar a escalabilidade e manutenção.

🔐 Autenticação
O sistema de autenticação foi implementado com JWT:

O token é gerado no login e armazenado no Zustand (frontend).

As requisições para rotas privadas utilizam o cabeçalho:
Authorization: Bearer <token>.

Todas as rotas protegidas validam a autenticidade do token no backend.

🔄 Fluxo de Telas
As telas foram desenvolvidas com base no layout oficial disponibilizado pela HubLocal no Figma:

📐 Figma - Teste HubLocal

Tela de Login e Registro de usuários.

Listagem de empresas (com ou sem dados cadastrados).

Modal para criar, editar e excluir empresas.

Visualização e edição de locais vinculados a uma empresa.

📄 Licença
Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica e não possui licença aberta para redistribuição ou uso comercial.

📬 Contato
Nome: [Davi Artur]
Email: [daviarturdesa686@gmail.com]
LinkedIn: https://www.linkedin.com/in/davi-barreto-578906234/

cd backend
cp .env.example .env

yarn install
npx prisma migrate dev
npm run start:dev


cd frontend
cp .env.example .env

yarn install
npm run