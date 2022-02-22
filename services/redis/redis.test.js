const createRedisConnection = require("./redis.js");

describe('CHECK - Redis', () => {
    test('Deve ter os métodos #start e #stop', async () => {
        const redis = createRedisConnection();

        expect(redis).toHaveProperty('start');
        expect(redis).toHaveProperty('stop');
    });
});
