class RedisTools {

    /**
     * @name set - Inserir um valor no Redis
     *
     * @param {String} key
     * @param {String} name
     * @param {String} value
     * @param {JSON} options
     *
     */
    set = (key, name, value, options = {}) => {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                if (!redis) {
                    return resolve(true);
                }

                redis.hmset([key, name, value], (err, res) => err ? resolve(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    /**
     * @name get - Obter um valor no Redis
     *
     * @param {String} key
     * @param {String} name
     * @param {JSON} options
     *
     */
    get = (key, name, options = {}) => {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                redis.hget([key, name], (err, res) => err ? reject(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    /**
     * @name remove - Removendo um valor do Redis
     *
     * @param {String} key
     * @param {String} name
     * @param {JSON} options
     *
     */
    remove = (key, name, options = {}) => {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                if (!redis) {
                    return resolve(true);
                }

                redis.hdel([key, name], (err, res) => err ? reject(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    /**
     * @name cache - Inserindo um valor no cache do Redis
     *
     * @param {JSON} options
     * @param {String} key
     * @param {String} name
     * @param {Number} time
     *
     */
    cache = (options = {}, key, value, time) => {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                if (!redis) {
                    return resolve(true);
                }

                const cacheTime = time ? time : 30; // 30 seconds default
                redis.set([key, JSON.stringify(value), 'EX', cacheTime], (err, res) => err ? reject(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    /**
     * @name findCache - Obtendo um valor no Cache
     *
     * @param {String} key
     * @param {JSON} options
     *
     */
    findCache = (key, options = {}) => {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                if (!redis) {
                    return resolve(true);
                }

                redis.get([key], (err, res) => err ? reject(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

}

module.exports = new RedisTools()
