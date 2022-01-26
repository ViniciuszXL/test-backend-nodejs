import { Product } from '../../models/product.model.js'
import RedisTools from '../../services/redis/redis.tools.js';

export default function TitleProductsList() {

    const tools = new RedisTools();

    async function search(options = {}) {
        return new Promise((resolve, reject) => {
            try {

            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

    return {
        search
    }
}
