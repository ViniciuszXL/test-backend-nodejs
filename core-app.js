const mongo = require("./services/mongo/mongo.js");
const redis = require('./services/redis/redis.js');
const _server = require('./services/server/server.js');
const routes = require('./routes/routes.js');

class Core {

    /**
     * @name start - Inicia o core
     *
     * @param {JSON} options
     */
    start = (options = {}) => {
        return new Promise((resolve, reject) => {
            console.log('> [core] Iniciando...');

            // Conexão com o MongoDB //
            mongo.start(options)

            // Conexão feita com sucesso //
            .then(mongoCon => {

                // Conexão com o Redis //
            redis.start()

            // Conexão feita com sucesso //
            .then(redisCon => {
                    // Iniciando a aplicação //
                    _server.start(options)

                    // Aplicação iniciada com sucesso //
                    .then(connection => {
                        const { app, server } = connection;
                        const options = {
                            mongo: mongoCon,
                            mongoClass: mongo,
                            redis: redisCon,
                            redisClass: redis,
                            server: app,
                            webserver: _server,
                            httpServer: server
                        }

                        // Iniciando as rotas //
                        routes.start(options)

                        // Inicialização das rotas feita com sucesso !
                        .then(() => {
                            resolve(options);
                            console.log('> [core] Inicio do core finalizado! Sistema rodando.')
                        })

                        // Ocorreu um erro ao inicializar as rotas //
                        .catch(reject)
                    })

                    // Ocorreu um erro ao iniciar a aplicação //
                    .catch(reject)
            })

            // Ocorreu um erro ao iniciar a conexão com o Redis //
            .catch(reject)
            })

            // Ocorreu um erro ao iniciar a conexão com o Mongo //
            .catch(reject)
        });
    }

    /**
     * @name stop - Desliga o core
     *
     * @param {JSON} options
     */
    stop = (options = {}) => {
        console.log('> [core] Desligando...');

        return new Promise((resolve, reject) => {
            const { mongoClass, redisClass, webserver, httpServer } = options;

            // Finalizand o servidor //
            webserver.stop(httpServer)

            // Finalização ocoridda com sucesso //
            .then(() => {
                // Finalizando o MongoDB //
                mongoClass.stop()

                // Finalização ocoridda com sucesso //
                .then(() => {
                    // Finalizando o Redis //
                    redisClass.stop(options);
                    console.log('> [core] Desligamento finalizado!');
                    resolve(true);
                })

                // Ocorreu um erro //
                .catch(reject)
            })

            // Ocorreu um erro //
            .catch(reject)
        });
    }

}

module.exports = new Core();
