import dotenv from 'dotenv';

export default {

    CODE: {
        INTERN: 500,
        REDIRECT: 300,

        REQUEST: 400,
        NOT_ALLOWED: 401,
        PROHIBITED: 403,
        NOT_FOUND: 404
    },

    SERVER: {
        PORT: process.env.SERVER_PORT || 3333
    },

    REDIS: {
        ENABLE: process.env.REDIS_ENABLE || 1,
        HOST: process.env.REDIS_HOST || '127.0.0.1',
        PORT: process.env.REDIS_PORT || 6379,
    },

    MONGO: {
        HOST: process.env.MONGO_HOST || '127.0.0.1',
        DATABASE: process.env.MONGO_DATABASE || 'test',
        PORT: process.env.MONGO_PORT || 27017,
    }

}