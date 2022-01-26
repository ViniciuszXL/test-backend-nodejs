import restify from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import environments from "../../common/environments.js";

export default function createServer() {

    function start(options = {}) {
        return new Promise(async (resolve, reject) => {
            console.log('> [server_service] Iniciando...');
            const { PORT } = environments.SERVER;
            const { isTest } = options;

            try {
                const server = restify.createServer({ name: 'catalog-rest-api', version: '1.0.0' });

                // Middleware //
                const options = {
                    preflightMaxAge: 10,
                    origins: ['*'],
                    allowHeaders: ['authorization'],
                    exposeHeaders: ['x-custom-header']
                }

                const cors = corsMiddleware(options);
                server.pre(cors.preflight);

                // Plugins //
                server.use(cors.actual);
                server.use(restify.plugins.queryParser());
                server.use(restify.plugins.bodyParser());

                // Listen //
                console.log(`> [server_service] Iniciando a aplicação na porta ${PORT}`)
                server.listen(PORT, () => {
                    resolve(isTest ? () => {} : server)
                    console.log('> [server_service] Aplicação iniciada com sucesso!')
                });

                // Ocorreu um erro //
                server.on('error', (e) => {
                    reject(e)
                    console.log('> [server_service] Ocorreu um erro ao iniciar a aplicação')
                });
            } catch (e) {
                console.log(e);
                throw new Error(e)
            }
        });
    }

    function stop(server) {
        return new Promise((resolve, reject) => {
            console.log('> [server_service] Desligando...');

            try {
                server.close();
                console.log('> [server_service] Aplicação foi desligada com sucesso.'), resolve(true)
            } catch (e) {
                throw new Error(e), console.log('> [server_service] Ocorreu um erro ao desligar a aplicação'), reject(e)
            }
        })
    }

    return {
        start,
        stop
    }
}
