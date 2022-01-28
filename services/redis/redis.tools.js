export default function RedisTools() {

    function set(key, name, value, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                if (!redis) {
                    return resolve(true);
                }

                redis.hmset([ key, name, value ], (err, res) => err ? resolve(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    function get(key, name, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                redis.hget([ key, name ], (err, res) => err ? reject(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    function remove(key, name, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                if (!redis) {
                    return resolve(true);
                }

                redis.hdel([ key, name ], (err, res) => err ? reject(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    // Cache below //

    function cache(options = {}, key, value, time) {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                if (!redis) {
                    return resolve(true);
                }

                const cacheTime = time ? time : 30; // 30 seconds default
                redis.set([ key, JSON.stringify(value), 'EX', cacheTime ], (err, res) => err ? reject(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    function findCache(key, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                const { redis } = options;
                if (!redis) {
                    return resolve(true);
                }

                redis.get([ key ], (err, res) => err ? reject(err) : resolve(res))
            } catch (e) {
                reject(e)
            }
        });
    }

    return {
        set,
        get,
        remove,
        cache,
        findCache
    }
}
