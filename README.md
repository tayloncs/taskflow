# Título do projeto

Projeto Taskflow, desenvolvido para gerenciar uma lista de tarefas com CRUD basico.
Criação de usuario e controle de acesso

## 🚀 Começando

O projeto esta dividido entre front-end pasta app, back-end pasta api e banco de dados MySql em docker no arquivo compose.yml na raiz.

### 📋 Pré-requisitos

### Softwares Necessários

- **Node.js**: versão 14 ou superior. [Download aqui](https://nodejs.org/)
- **npm** ou **yarn**: Gerenciador de pacotes para instalação de dependências.
  - **npm**: [Guia de instalação](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  - **yarn**: [Guia de instalação](https://classic.yarnpkg.com/en/docs/install)
- **Docker**: Para executar o banco de dados em um contêiner. [Download aqui](https://www.docker.com/products/docker-desktop)
- **Git**: Para clonar o repositório do GitHub. [Download aqui](https://git-scm.com/)

### Configuração Adicional

- **Variáveis de Ambiente**: Configurações do arquivo `.env` podem ser encontras em `.env.example`

### 🔧 Instalação

Abra um terminal na pasta raiz do projeto
Execute o comando para subir o container do banco de dados (docker deve estar inicializado)

```
npm run up-db
```

ou

```
docker compose up
```

Execute a instalação de cada parte do projeto ou os comando

```
npm run install-back
```

e depois

```
npm run install-front
```

## Inicializar o projeto em modo dev

Executar na raiz os comandos abaixo ou acessar individualmente cada parte do projeto

```
npm run run-back
```

e depois

```
npm run run-front
```

## Documentação

### Uso

Para uso deve-se logar com `userName` e `password` ou realizar um cadastro de usuario, nos dois metodos sera retornado um `access-token` para o usuario.

Criação de Task deve ter usuario logado e preencher `name` e `description` referente a Task

Cada Task deve ter nome unico para cada usuario, apos criadas podem ser marcadas com status `true` alterando para finalizada, no metodo `Patch/Editar` passando nome da task e status, mesmo metodo usado para alterar `name` e `description` da task.

Ação de `delete` remove a task do banco do dados

#### Documentação e uso da api via Swagger pode ser acessado na url http://localhost:3000/api#/

#### Nas configurações padrão o acesso do front na url http://localhost:5173/

## 🛠️ Construído com

### Frontend

- **ReactJS com TypeScript**
- **Styled-components**
- **React Hook Form** + **Zod**

### Backend

- **NestJS** - Framework para construção de APIs.
- **TypeORM** - ORM para manipulação de banco de dados.
- **JWT** - Para autenticação e autorização.
- **Swagger** - Para documentação automática da API.

## ✒️ Autor

- **Taylon Castro Stefanello** - [linkedin](https://www.linkedin.com/in/taylon-castro-stefanello-7311a1a0/)
