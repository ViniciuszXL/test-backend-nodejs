import redis, { RedisClient } from 'redis';
import environments from '../../common/environments';

export default function createRedisConnection() {

    function start() {
        return new Promise(async (resolve, reject) => {
            console.log('> [redis_Service] Iniciando...');
            
            const { HOST, PORT } = environments.REDIS;
            const URI = `redis://${HOST}:${PORT}`;

            try {
                // Criando o cliente // 
                const client = new RedisClient({ port: PORT, host: HOST });

                // Conexão feita com sucesso //
                client.on('connect', resolve);

                // Ocorreu um erro na conexão //
                client.on('error', (e) => {
                    reject(e)
                    throw new Error(e)
                });
            } catch (e) {
                throw new Error(e);
            }
        });
    }

    function stop(redis) {
        return new Promise((resolve, reject) => {
            try {
                redis.quit();
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    return {
        start,
        stop
    }
}