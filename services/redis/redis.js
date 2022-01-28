import redis from 'redis';
import environments from '../../common/environments.js';

export default function createRedisConnection() {

    function start() {
        return new Promise(async(resolve, reject) => {
            console.log('> [redis_service] Iniciando...');

            const { HOST, PORT } = environments.REDIS;
            console.log(`> [redis_service] Conectando a ${HOST}:${PORT}`);

            try {
                // Criando o cliente //
                const client = redis.createClient({ host: HOST, port: PORT });

                // Conexão feita com sucesso //
                client.on('connect', () => {
                    console.log('> [redis_service] Conexão feita com sucesso!')
                    resolve(client)
                });

                // Ocorreu um erro na conexão //
                client.on('error', (e) => {
                    reject(e)
                    console.log('> [redis_service] Ocorreu um erro ao iniciar a conexão')
                });
            } catch (e) {
                console.log(e);
                throw new Error(e);
            }
        });
    }

    function stop(options = {}) {
        console.log('> [redis_service] Desligando...');
        
        const { redis } = options;
        if (!redis) {
            throw new Error('> [redis_service] Conexão com o Redis não informada! Cancelando desconexão...');
        }

        try {
            console.log('> [redis_service] Desligamento finalizado!');
            redis.quit();
        } catch (err) {
            throw new Error(err);
        }
    }

    return {
        start,
        stop
    }
}
