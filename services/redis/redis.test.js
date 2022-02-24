const redis = require("./redis.js");

describe('CHECK - Redis', () => {
    test('Deve ter os métodos #start e #stop', async () => {
        expect(redis).toHaveProperty('start');
        expect(redis).toHaveProperty('stop');
    });
});
