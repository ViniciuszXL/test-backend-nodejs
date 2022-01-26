import createMongoConnection from './mongo';

describe('CHECK - Mongo', () => {
    test('Deve ter os métodos #start e #stop', () => {
        const mongo = createMongoConnection();

        expect(mongo).toHaveProperty('start');
        expect(mongo).toHaveProperty('stop');
    });
})

describe('START - Mongo', () => {
    test('Deve inicializar a conexão com o Mongo', () => {
        const mongo = createMongoConnection();

        expect(() => {
            mongo.start();
        }).not.toThrow();
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