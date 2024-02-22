<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" />

# API Territórios

## Visão Geral

A API Territórios é uma aplicação backend construída com o framework NestJS, projetada para fornecer endpoints de API robustos e escaláveis para gerenciamento de territórios.

## Recursos

- **Autenticação**: Utiliza JWT (Tokens JSON Web) para autenticação segura.
- **Autorização**: Implementa controle de acesso baseado em papéis (RBAC) para gerenciar permissões de usuário.
- **Integração com MongoDB**: Utiliza o ODM Mongoose para integração sem problemas com bancos de dados MongoDB.
- **Integração com AWS**: Integrada com SDK AWS para acessar os serviços da AWS.
- **Validação**: Utiliza class-validator para validação de entrada e class-transformer para transformação de dados.
- **Tratamento de Erros**: Fornece tratamento de erros centralizado e registro para melhor depuração.
- **Testes**: Inclui testes unitários abrangentes e testes de ponta a ponta usando Jest e Supertest.
- **Linting**: Configurada com ESLint para linting de código e formatação.
- **Configuração de Ambiente**: Usa @nestjs/config para gerenciamento de configuração baseada em ambiente.
- **Moment Timezone**: Incorpora moment-timezone para manipulação de operações relacionadas ao fuso horário.

## Pré-requisitos

- Node.js e npm instalados em sua máquina
- Instância de banco de dados MongoDB
- Conta da AWS (para integração com a AWS)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/antonioluciofb/territories-api
   ```

2. Instale as dependências:

   ```bash
   cd api-territorios
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` com base em `.env.example`.
   - Preencha as variáveis de ambiente necessárias.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
