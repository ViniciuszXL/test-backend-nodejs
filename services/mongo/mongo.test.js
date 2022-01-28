import createMongoConnection from './mongo.js';

describe('CHECK - Mongo', () => {
    test('Deve ter os métodos #start e #stop', () => {
        const mongo = createMongoConnection();

        expect(mongo).toHaveProperty('start');
        expect(mongo).toHaveProperty('stop');
    });
})

describe('START - Mongo', () => {
    test('Deve inicializar a conexão com o Mongo', async() => {
        const mongo = createMongoConnection();

        const connection = await mongo.start({ isTest: true, database: 'tests' });
        expect(connection).not.toThrow();
    });
});

describe('END - Mongo', () => {
    test('Deve finalizar a conexão com o Mongo', () => {
        const mongo = createMongoConnection();

        expect(() => {
            mongo.stop();
        }).not.toThrow();
    });
});
