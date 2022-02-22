const mongoose = require('mongoose')
const environment = require('../../common/environments.js')

class Mongo {

    /**
     * @name start - Iniciando o Mongo
     *
     * @param {JSON} options
     *
     */
    start = (options = {}) => {
        return new Promise(async (resolve, reject) => {
            console.log('> [mongo_service] Iniciando...');

            const { database, isTest } = options;
            const { HOST, PORT, DATABASE } = environment.MONGO;
            const URI = `mongodb://${HOST}:${PORT}/${ database || DATABASE }`;
            console.log(`> [mongo_service] Conectando a ${URI}`)

            try {
                const connection = await mongoose.connect(URI);
                console.log('> [mongo_service] Conexão feita com sucesso!');
                resolve(isTest ? () => {} : connection);
            } catch (e) {
                console.log('> [mongo_service] Ocorreu um erro ao conectar ao Mongo'),
                reject(false)
                throw new Error(e)
            }
        });
    }

    /**
     * @name stop - Desligando o serviço do Mongo
     */
    stop = () => {
        console.log('> [mongo_service] Desligando...');

        try {
            mongoose.connection.close();
            console.log('> [mongo_service] Desligamento finalizado!');
        } catch (e) {
            throw new Error(e), resolve(false)
        }
    }

}

module.exports = new Mongo();
