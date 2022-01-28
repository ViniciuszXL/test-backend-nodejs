# catalog-rest-api
API Rest para controle de categorias e produtos

## Configuração

É necessário que você crie um arquivo denominado .env para que o programa inicie normalmente. Você pode copiar o modelo de .env do `.env.example`

## Dependências necessárias

Você necessitará do `MongoDB` instalado na sua máquina ou em um servidor para que os dados sejam armazenados. Há também o `Redis`, para que esses dados sejam buscados mais rápidos. Porém, não é obrigatório ter a aplicação e você pode desativá-la no `.env`

## Como subir a aplicação

### Normal

Você precisará instalar todas as dependências do projeto com o comando `npm install`. Após isso, você poderá rodar o aplicativo usando 3 tipos de inicialização, que são:

##### NodeJS

Comando: `node main.js`

##### PM2

Comando (Cluster): `pm2 start main.js -i 0`
Comando (Normal): `pm2 start main.js`

##### Nodemon

Comando: `nodemon main.js`

## Dependências utilizadas

* Body-Parser
* Cors
* Dotenv
* Express
* HTTP
* Mongoose
* Node
* Redis
