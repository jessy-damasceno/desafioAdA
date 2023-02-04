# Anfitriões de Aluguel - DESAFIO DE CÓDIGO PARA DESENVOLVEDOR FULL STACK JUNIOR

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Um container docker MySQL configurado no docker-compose através de um serviço definido como `db` rodando na porta 3002.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Roda na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão (pode ser trocado com um arquivo .env devidamente configurado);
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Aplicação criada com TypeScript, Node.js e Express.js, seguindo os conceitos de API Rest e POO (modificadores de acesso, interfaces e afins).

3️⃣ **Front-end:**
  - Pode ser executado no endpoint: `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints construídos nas rotas da API.
  - Nele, o usuário é capaz de gerar relatórios (.csv) de Contas, Contas a Pagar, Contas a Receber, aplicando todos os filtros necessários e selecionando as linhas de interesse para a geração do relatório.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;

</details>

O banco de dados é MySQL e é gerenciado pelo Sequelize. Ele possui três models: Contas, Reservas e Propriedades. O arquivo .csv disponibilizado foi usado como seeder. Convertido para JSON e no formato para facilitar o seeder.
Rotas

Existem rotas para buscar todas as contas, contas a pagar e contas a receber (que se diferenciam pelo tipo). Além disso, utilizamos interfaces e classes abstratas para implementação da Programação Orientada a Objetos.

## Orientações

1. Clone o repositório `Usar link SSH`

- Entre na pasta do repositório que você acabou de clonar:
  *`cd pasta-do-repositório`

  2. Instale as dependências:
  *`npm install`

  3. Rodar o comando na raíz do projeto:
  *`npm run compose:up:dev`
  
  4. Conferir se todos os containeres subiram corretamente, o back-end depende do db, o front-end depende do back-end (dependências criadas no docker-compose).
  
  5. Execute o comando listar do Docker para obter uma lista de todos os contêineres do Docker executados no sistema:
  *`docker container ls`

  6. Entre no container do back-end e execute o comando a seguir, sendo que <container name> é o nome do container do back-end:
  *`docker exec –it <container name> /bin/bash`
  
  7. Executar o comando para dar seed no banco de dados:
  *`npm run db:reset`

  8. O container do back-end já está configurado para inicializar a API quando startado. Caso isto não aconteça, pode executar `npm run dev` ou `npm start` (a única diferença é que o npm run dev fica escutando alterações nos arquivos back-end).
  
  9. O container do front-end, assim como do back-end, já está configurado para inicializar a aplicação quando for startado. Caso aconteça algum erro e ele não for inicializado, startar o container manualmente (`docker exec –it <container name> /bin/bash`) e rodar o script `npm start` *dentro do container*.
  
  10. É possível rodar a aplicação front-end fora do container. Para isto, da raíz do projeto:
  *`cd app/frontend && npm install`
    - esperar a instalação dos pacotes node
  *`npm start` -> (a aplicação rodará em http://localhost:3000)
