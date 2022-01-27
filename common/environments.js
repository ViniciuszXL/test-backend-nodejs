import dotenv from 'dotenv'

// Inicializando  o dotenv //
dotenv.config()

export default {

    CODE: {
        SUCCESS: 200,

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

        KEY: {
            PRODUCT: {
                CACHE: {
                    TITLE: '#PRODUCT_TITLE_',
                    CATEGORY: '#PRODUCT_CATEGORY_',
                    ALL: "#PRODUCT_ALL"
                }
            }
        }
    },

    MONGO: {
        HOST: process.env.MONGO_HOST || '127.0.0.1',
        DATABASE: process.env.MONGO_DATABASE || 'test',
        PORT: process.env.MONGO_PORT || 27017,
    }

}
