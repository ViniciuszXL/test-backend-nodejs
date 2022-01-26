import createRedisConnection from "./redis";

describe('CHECK - Redis', () => {
    test('Deve ter os métodos #start e #stop', () => {
        const redis = createRedisConnection();

        expect(redis).toHaveProperty('start');
        expect(redis).toHaveProperty('stop');
    });
});

let redisConnection;

describe('START - Redis', () => {
    test('Deve inicializar a conexão com o Redis', () => {
        const redis = createRedisConnection();

        expect(async () => {
            redisConnection = await redis.start()
        }).not.toThrow();
    })
});