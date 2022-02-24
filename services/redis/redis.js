const redis = require('redis');
const environments = require('../../common/environments.js')

class Redis {

    /**
     * @name start - Inicia o serviço do Redis
     */
    start = () => {
        return new Promise((resolve, reject) => {
            console.log('> [redis_service] Iniciando...');

            const { HOST, PORT, ENABLE } = environments.REDIS;
            if (ENABLE != 1) {
                console.log('> [redis_service] Engine do redis está desabilitada. Abortando conexão')
                return resolve(undefined)
            }

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

    /**
     * @name stop - Desligando o serviço do Redis
     *
     * @param {JSON} options
     *
     */
    stop = (options = {}) => {
        console.log('> [redis_service] Desligando...');

        const { redis } = options;
        if (!redis) {
            return console.log('> [redis_service] Conexão com o Redis não informada! Cancelando desconexão...')
        }

        try {
            console.log('> [redis_service] Desligamento finalizado!');
            redis.quit();
        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = new Redis();
