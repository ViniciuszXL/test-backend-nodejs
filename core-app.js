import createMongoConnection from "./services/mongo/mongo.js";
import createRedisConnection from './services/redis/redis.js';
import createServer from './services/server/server.js';
import routes from './routes/routes.js'

export default function createCore() {

    const mongo = createMongoConnection();
    const redis = createRedisConnection();
    const _server = createServer();

    async function start(options = {}) {
        return new Promise(async (resolve, reject) => {
            console.log('> [core] Iniciando...');

            // dependencies, databases, routes, servers, etc //
            // Conexão com o MongoDB //
            const mongoCon = await mongo.start(options);

            // Conexão com o Redis //
            const redisCon = await redis.start();

            // Iniciando a aplicação //
            _server.start()

            // Aplicação iniciada com sucesso //
            .then(connection => {
                const { app, server } = connection;
                const options = { mongo: mongoCon, redis: redisCon, server: server, webserver: _server, app: app }

                // Iniciando as rotas //
                routes().start(options)

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
        });
    }

    async function stop(options = {}) {
        console.log('> [core] Desligando...');

        const { mongo, redis, webserver, app } = options;

        // Finalizand o servidor //
        await webserver.stop(app);

        // Finalizando o MongoDB //
        mongo.stop();

        // Finalizando o Redis //
        redis.stop(options);


        console.log('> [core] Desligamento finalizado!');
    }

    return {
        start,
        stop
    }
}
