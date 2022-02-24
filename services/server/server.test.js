const server = require("./server.js");

describe('CHECK - Server', () => {
    test('Deve ter os métodos #start e #stop', () => {
        expect(server).toHaveProperty('start');
        expect(server).toHaveProperty('stop');
    });
});
