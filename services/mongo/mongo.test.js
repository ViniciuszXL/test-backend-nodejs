const mongo = require('./mongo.js');

describe('CHECK - Mongo', () => {
    test('Deve ter os métodos #start e #stop', () => {
        expect(mongo).toHaveProperty('start');
        expect(mongo).toHaveProperty('stop');
    });
})

describe('START - Mongo', () => {
    test('Deve inicializar a conexão com o Mongo', () => {
        mongo.start({ isTest: true, database: 'testes' })
        .then(connection => {
            expect(connection).not.toThrow();
        })
        .catch(console.log)
    });
});

describe('END - Mongo', () => {
    test('Deve finalizar a conexão com o Mongo', () => {
        expect(() => {
            mongo.stop();
        }).not.toThrow();
    });
});
