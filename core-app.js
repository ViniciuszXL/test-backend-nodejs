import createMongoConnection from "./services/mongo/mongo.js";
import createRedisConnection from './services/redis/redis.js';
import createServer from './services/server/server.js';
import routes from './routes/routes.js'

export default function createCore() {

    const mongo = createMongoConnection();
    const redis = createRedisConnection();
    const _server = createServer();

    function start(options = {}) {
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
               })
    
               // Ocorreu um erro ao iniciar a conexão com o Redis //
               .catch(reject)
            })
    
            // Ocorreu um erro ao iniciar a conexão com o Mongo //
            .catch(reject)
        });  
    }

    async function stop(options = {}) {
        console.log('> [core] Desligando...');

        const { mongoClass, redisClass, webserver, httpServer } = options;

        // Finalizand o servidor //
        await webserver.stop(httpServer);

        // Finalizando o MongoDB //
        await mongoClass.stop();

        // Finalizando o Redis //
        redisClass.stop(options);

        console.log('> [core] Desligamento finalizado!');
    }

    return {
        start,
        stop
    }
}
