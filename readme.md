# API Territórios

## Visão Geral

A API Territórios é uma aplicação backend construída com o framework NestJS, projetada para fornecer endpoints de API robustos e escaláveis para gerenciamento de territórios. A API oferece recursos para criar, ler, atualizar e excluir territórios, bem como para atribuir e revogar territórios de usuários. A aplicação é construída com base em princípios de arquitetura limpa e segue as melhores práticas de desenvolvimento de software.

## Recursos

- **Autenticação**: Utiliza JWT (Tokens JSON Web) para autenticação segura.
- **Autorização**: Implementa controle de acesso baseado em papéis (RBAC) para gerenciar permissões de usuário.
- **Integração com MongoDB**: Utiliza o ODM Mongoose para integração sem problemas com bancos de dados MongoDB.
- **Integração com AWS**: Integrada com SDK AWS para acessar os serviços da AWS.
- **Validação**: Utiliza class-validator para validação de entrada e class-transformer para transformação de dados.
- **Tratamento de Erros**: Fornece tratamento de erros centralizado e registro para melhor depuração.
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
   git clone https://github.com/seu-nome-de-usuario/api-territorios.git
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