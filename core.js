import createMongoConnection from "./services/mongo";

export default function createCore() {

    const mongo = createMongoConnection();

    function start() {
        console.log('> [core] Iniciando...');

        // dependencies, databases, routes, servers, etc //
        mongo.start().catch(error => new Error(error));

        console.log('> [core] Inicio finalizado! Sistema rodando.');
    }

    function stop() {
        console.log('> [core] Desligando...');

        // dependencies, databases, routes, servers, etc //

        console.log('> [core] Desligamento finalizado!');
    }

    return {
        start,
        stop
    }
}