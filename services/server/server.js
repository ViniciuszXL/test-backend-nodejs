const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

// Swagger //
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('../../swagger.json');

const environments = require("../../common/environments.js");

class Server {

    /**
     * @name start - Iniciando o servidor
     *
     * @param {JSON} options
     *
     * @returns Inicialização foi feita com sucesso ou deu erro
     */
    start = (options = {}) => {
        return new Promise((resolve, reject) => {
            console.log('> [server_service] Iniciando...');
            const { PORT } = environments.SERVER;
            const { isTest, port } = options;

            try {
                const app = express()
                const server = http.createServer(app)

                // Middleware //
                const _cors = cors({
                    origin: ['*'],
                    preflightMaxAge: 10,
                    allowHeaders: ['authorization'],
                    exposeHeaders: ['x-custom-header']
                })

                // Documentation //
                app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

                // Habilitando o CORS no servidor //
                app.use(_cors)

                // Plugins //
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use(bodyParser.json())

                // Listen //
                console.log(`> [server_service] Iniciando a aplicação na porta ${PORT}`)
                server.listen(port || PORT);

                // Callbacks //
                server.on('listening', () => {
                    const dependencies = { app: app, server: server };
                    resolve(isTest ? () => {} : dependencies)

                    console.log('> [server_service] Aplicação iniciada com sucesso!')
                })

                server.on('error', (e) => {
                    reject(e)
                    console.log('> [server_service] Ocorreu um erro ao iniciar a aplicação')
                });
            } catch (e) {
                console.log('> [server_service] Ocorreu um erro ao iniciar a aplicação')
                reject(e)
                throw new Error(e)
            }
        });
    }

    /**
     * @name stop - Desliga o servidor
     *
     * @param {Object} server
     *
     * @returns Desligamento finalizado ou deu erro
     */
    stop = (server) => {
        return new Promise((resolve, reject) => {
            console.log('> [server_service] Desligando...');

            try {
                server.close();
                console.log('> [server_service] Aplicação foi desligada com sucesso.')
                resolve(true)
            } catch (e) {
                console.log('> [server_service] Ocorreu um erro ao desligar a aplicação')
                reject(e)
                throw new Error(e)
            }
        })
    }

}

module.exports = new Server();
