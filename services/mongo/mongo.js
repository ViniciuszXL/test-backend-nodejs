import mongoose from 'mongoose';
import environment from '../../common/environments.js';

export default function createMongoConnection() {

    function start(options = {}) {
        return new Promise(async (resolve, reject) => {
            console.log('> [mongo_service] Iniciando...');

            const { database, isTest } = options;
            const { HOST, PORT, DATABASE } = environment.MONGO;
            const URI = `mongodb://${HOST}:${PORT}/${ database || DATABASE }`;
            console.log(`> [mongo_service] Conectando ${URI}`)

            try {
                const connection = await mongoose.connect(URI);
                console.log('> [mongo_service] Conexão feita com sucesso!');
                resolve(isTest ? () => {} : connection);
            } catch (e) {
                throw new Error(e), console.log('> [mongo_service] Ocorreu um erro ao conectar ao Mongo'), resolve(false)
            }
        });
    }

    function stop() {
        console.log('> [mongo_service] Desligando...');

        try {
            mongoose.connection.close();
            console.log('> [mongo_service] Desligamento finalizado!');
        } catch (e) {
            throw new Error(e), resolve(false)
        }
    }

    return {
        start,
        stop
    }
}
