import createMongoConnection from "./services/mongo/mongo.js";
import createRedisConnection from './services/redis/redis.js';
import createServer from './services/server/server.js';
import routes from './routes/routes.js'

export default function createCore() {

    const mongo = createMongoConnection();
    const redis = createRedisConnection();
    const server = createServer();

    async function start() {
        console.log('> [core] Iniciando...');

        // dependencies, databases, routes, servers, etc //
        // Conexão com o MongoDB //
        const mongoCon = await mongo.start();

        // Conexão com o Redis //
        const redisCon = await redis.start();

        // Iniciando a aplicação //
        server.start()

        // Aplicação iniciada com sucesso //
        .then(connection => {
            const options = { mongo: mongoCon, redis: redisCon, server: connection }

            // Iniciando as rotas //
            routes().start(options)

            // Inicialização das rotas feita com sucesso !
            .then(console.log('> [core] Inicio do core finalizado! Sistema rodando.'))

            // Ocorreu um erro ao inicializar as rotas //
            .catch(console.log)
        })

        // Ocorreu um erro ao iniciar a aplicação //
        .catch(console.log)

        // Iniciando as rotas //
        //routes().start({ mongo: mongoCon, redis: redisCon, server: _server });
    }

    function stop() {
        console.log('> [core] Desligando...');

        // dependencies, databases, routes, servers, etc //

        console.log('> [core] Desligamento finalizado!');
    }

    return {
        start,
        stop
    }
}
