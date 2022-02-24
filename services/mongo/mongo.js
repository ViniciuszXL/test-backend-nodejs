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
        return new Promise((resolve, reject) => {
            const { database, isTest } = options;
            if (!isTest)
                console.log('> [mongo_service] Iniciando...');

            const { HOST, PORT, DATABASE } = environment.MONGO;
            const URI = `mongodb://${HOST}:${PORT}/${ database || DATABASE }`;
            if (!isTest)
                console.log(`> [mongo_service] Conectando a ${URI}`)

            try {
                mongoose.connect(URI)
                // Conexão //
                .then(connection => {
                    if (!isTest)
                        console.log('> [mongo_service] Conexão feita com sucesso!');

                    resolve(isTest ? () => {} : connection)
                })
                // Error //
                .catch(reject)
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
        return new Promise((resolve, reject) => {
            console.log('> [mongo_service] Desligando...');

            try {
                mongoose.connection.close();
                console.log('> [mongo_service] Desligamento finalizado!');
                resolve(true)
            } catch (e) {
                reject(false)
                throw new Error(e)
            }
        })
    }

}

module.exports = new Mongo();
