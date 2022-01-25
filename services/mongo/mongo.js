import mongoose from 'mongoose';
import environment from '../../common/environments';

export default function createMongoConnection() {

    function start() {
        console.log('> [mongo_service] Iniciando...');

        const { HOST, PORT, DATABASE } = environment.MONGO;
        const URI = `mongodb://${HOST}:${PORT}/${DATABASE}`;

        console.log(URI);

        const initConnection = () => {
            return new Promise(async(resolve, reject) => {
                try {
                    const connection = await mongoose.connect(URI);
                    resolve(connection);
                } catch (e) {
                    reject(e);
                }
            });
        }

        // Iniciando a conexão //
        initConnection()

        // Conexão bem sucedida
        .then(() => {
            console.log('> [mongo_service] Inicio finalizado! Sistema rodando.')
        })

        // Ocorreu um erro na conexão //
        .catch(err => {
            throw new Error(err);
        });
    }

    function stop() {
        console.log('> [mongo_service] Desligando...');

        // dependencies, databases, routes, servers, etc //

        console.log('> [mongo_service] Desligamento finalizado!');
    }

    return {
        start,
        stop
    }
}