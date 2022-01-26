import mongoose from 'mongoose';
import environment from '../../common/environments';

export default function createMongoConnection() {

    function start(database) {
        return new Promise(async (resolve, reject) => {
            console.log('> [mongo_service] Iniciando...');

            const { HOST, PORT, DATABASE } = environment.MONGO;
            const URI = `mongodb://${HOST}:${PORT}/${ database || DATABASE }`;

            try {
                const connection = await mongoose.connect(URI);
                resolve(connection);
            } catch (e) {
                throw new Error(e)
            }
        });
    }

    function stop() {
        console.log('> [mongo_service] Desligando...');

        try {
            mongoose.connection.close();
            console.log('> [mongo_service] Desligamento finalizado!');
        } catch (e) {
            throw new Error(e);
        }
    }

    return {
        start,
        stop
    }
}