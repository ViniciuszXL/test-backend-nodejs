import createServer from "./server.js";

describe('CHECK - Server', () => {
    test('Deve ter os métodos #start e #stop', () => {
        const server = createServer();

        expect(server).toHaveProperty('start');
        expect(server).toHaveProperty('stop');
    });
});
