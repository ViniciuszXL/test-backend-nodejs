import { Product } from '../../models/product.model.js'

export default function FullProductsList() {

    async function search(title, categoryId) {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await Product.find({ $and: [{ title: title }, { categoryId: categoryId }]})
                return resolve(products);
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
