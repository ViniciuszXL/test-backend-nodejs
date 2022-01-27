import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

import environments from "../../common/environments.js";

export default function createServer() {

    function start(options = {}) {
        return new Promise(async (resolve, reject) => {
            console.log('> [server_service] Iniciando...');
            const { PORT } = environments.SERVER;
            const { isTest } = options;

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

                // Habilitando o CORS no servidor //
                app.use(_cors)

                // Plugins //
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use(bodyParser.json())

                // Listen //
                console.log(`> [server_service] Iniciando a aplicação na porta ${PORT}`)
                server.listen(PORT);

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

    function stop(server) {
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

    return {
        start,
        stop
    }
}
