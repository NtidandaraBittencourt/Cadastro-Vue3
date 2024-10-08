# Cadastro-Vue3

# **Sistema de Cadastramento de Usuário**

Este é um sistema básico de cadastramento de usuários desenvolvido como um desafio frontEnd pra MB Web, composto por um backend em Node.js com Express e um frontend em Vue.js 3 utilizando Vite e Tailwind CSS. A aplicação é containerizada utilizando Docker e pode ser facilmente executada utilizando Docker Compose. Também foram desenvolvidos testes E2E com cypress no frontend.

- [**Sobre o Projeto**](#sobre-o-projeto)
- [**Tecnologias Utilizadas**](#tecnologias-utilizadas)
- [**Estrutura do Projeto**](#estrutura-do-projeto)
- [**Pré-requisitos**](#pré-requisitos)
- [**Configuração do Ambiente**](#configuração-do-ambiente)
- [**Como Executar a Aplicação**](#como-executar-a-aplicação)
- [**Como executar os testes**](#como-executar-os-testes)
- [**Variáveis de Ambiente**](#variáveis-de-ambiente)
- [**Contribuindo**](#contribuindo)
- [**Referências**](#referências)

## **Sobre o Projeto**

Este projeto foi desenvolvido para gerenciar o cadastramento de usuários. Ele é composto por dois componentes principais:
1. **Backend:** Uma API RESTful desenvolvida com Node.js e Express que gerencia as operações de criação, leitura (CRUD).
2. **Frontend:** Uma interface de usuário desenvolvida com Vue.js 3, Vite, e Tailwind CSS para interação com a API de cadastramento.
3. **Teste:** Testes direcionados ao funcionamento da aplicação no frontend, e verificando o envio das requests pra API, testando os inputs, redirecionamento de páginas e apresentação de erros. Utilizando Cypress com o auxilio da interface de testes. 

## **Tecnologias Utilizadas**

- **Backend:** Node.js, Express
- **Frontend:** Vue.js 3, Vite, Tailwind CSS
- **Containerização:** Docker, Docker Compose
- **Libs auxiliáries:** yup(validação), maska(mascara)
- **Testes:** cypress

## **Estrutura do Projeto**

cadastro-vue3/
│
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├──registrations-vue3
│   │  └── Dockerfile
│   │  └── cypress/
│   |   ├── e2e
│   │   |  └── jsConfig.json
│   │   |  ├── Password
│   │   |  ├── renderPforPj
│   │   |  ├── Review
│   |   |  ├── Welcome
│   |   └── support
│   │  └── package.json
│   │  └── src/
│   │   └── main.js
│   │   └── ...
│   └── ...
│
└── docker-compose.yml

## **Pré-requisitos**
Antes de começar, você precisará ter as seguintes ferramentas instaladas:

- **Docker**
- **Docker Compose**

## **Configuração do Ambiente**
Clone o Repositório:

- git clone https://github.com/NtidandaraBittencourt/Cadastro-Vue3.git
- cd Cadastro-Vue3


## **Configuração de Variáveis de Ambiente:**

Crie um arquivo .env na raiz do arquivo frontend com as seguintes variáveis:

- **Frontend**
VITE_API_URL=http://localhost:3000

## **Como Executar a Aplicação**

- ### Build e Inicie os Contêineres:

Na raiz do projeto, execute o comando:

docker-compose up --build

Esse comando irá:

- Construir a imagem Docker do backend e iniciar o servidor na porta 3000.
- Construir a imagem Docker do frontend e iniciar o servidor na porta 8080.

- ### Acesse a Aplicação:

Após o build, a aplicação estará disponível nos seguintes endereços:

Frontend: http://localhost:8080
Backend: http://localhost:3000

## **Como Executar a Aplicação**
Para executar os testes no frontend navegue até a pasta onde estão os testes
- cd \frontend\registrations-vue3
- rodar o comando npm run test:e2e

## **Variáveis de Ambiente**
Aqui estão as principais variáveis de ambiente usadas na aplicação:

- NODE_ENV: Define o ambiente de execução (ex.: production, development).
- PORT: Porta em que o backend será executado.
- VITE_API_URL: URL base da API usada pelo frontend.

## **Contribuições**
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## **Referências**
O desafio foi desenvolvido seguindo a descrição e requisitos, disponiveis no github: https://github.com/wuzuio/desafio-mb-web

