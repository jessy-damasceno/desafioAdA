Este é um projeto dividido em frontend e backend. O backend foi desenvolvido com TypeScript e utiliza banco de dados MySQL com Sequelize. O frontend foi feito com JavaScript, React e Material UI.
Backend
Banco de dados

O banco de dados é MySQL e é gerenciado pelo Sequelize. Ele possui três models: Contas, Reservas e Propriedades. É possível inicializar o banco através de um arquivo CSV que é convertido para JSON, e que é utilizado para o seed.
Rotas

Existem rotas para buscar todas as contas, contas a pagar e contas a receber (que se diferenciam pelo tipo). Além disso, utilizamos interfaces e classes abstratas para implementação da Programação Orientada a Objetos.
Frontend

O frontend integra com o backend através de um arquivo docker-compose, que sobe o banco de dados, o backend e o frontend.

O frontend foi desenvolvido com JavaScript, React e Material UI. Além disso, há uma rotina para upload de arquivos CSV, que são convertidos para JSON antes de serem enviados para o backend.
Instalação

Para instalar e executar a aplicação, basta clonar o repositório, entrar na pasta e executar o comando docker-compose up. A aplicação estará disponível em http://localhost:3000.
