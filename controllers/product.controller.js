import { Product } from '../models/product.model.js'
import RouterCommon from '../common/router.common.js';
import environments from '../common/environments.js';
import RedisTools from '../services/redis/redis.tools.js'

export default function ProductController() {

    const routerCommon = new RouterCommon();
    const redisTools = new RedisTools();
    const redisEnable = environments.REDIS.ENABLE != 1 ? false : true;

    async function create(req, res) {
        try {
            const { title, categoryId } = req.body;

            // Verificando se existe o produto //
            const hasProduct = await Product.find({ title: title, categoryId: categoryId });
            if (hasProduct.length > 0) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Produto já cadastrado nessa categoria!'
                })
            }

            const _product = await Product.create(req.body);
            return routerCommon.sendResponse(res, { success: true, message: 'Produto criado com sucesso', data: _product })
        } catch (e) {
            console.log(e);
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro no registro do produto.',
                data: e
            })
        }
    }

    async function get(req, res, options = {}) {
        try {
            const { TITLE, CATEGORY, ALL } = environments.REDIS.KEY.PRODUCT.CACHE;
            const { title, categoryId } = req.query;

            // Busca por título e categoria //
            if (title && categoryId) {
                const key = `${ALL}`;

                // Buscando  no cache //
                if (redisEnable) {
                    const cache = await redisTools.findCache(key, options);
                    if (cache != null) {
                        return routerCommon.sendResponse(res, { success: true, data: JSON.parse(cache) });
                    }
                }

                // Buscando o produto por título //
                const products = await Product.find({ $and: [{ title: title }, { categoryId: categoryId }]})

                // Caso haja resultados, inserindo no cache para futuras requisições //
                if (products && redisEnable) {
                    // Inserindo no cache de 30 segundos //
                    await redisTools.cache(options, key, products, 30);
                }

                return routerCommon.sendResponse(res, { success: true, data: products })
            }

            // Busca por título //
            if (title) {
                const key = `${TITLE}${title.toUpperCase().replace(' ', '')}`

                // Buscando no Cache //
                if (redisEnable) {
                    const cache = await redisTools.findCache(key, options);
                    if (cache != null) {
                        return routerCommon.sendResponse(res, { success: true, data: JSON.parse(cache) });
                    }
                }

                // Buscando o produto por título //
                const products = await Product.find({ title: title })

                // Caso haja resultados, inserindo no cache para futuras requisições //
                if (products && redisEnable) {
                    // Inserindo no cache de 30 segundos //
                    await redisTools.cache(options, key, products, 30);
                }

                return routerCommon.sendResponse(res, { success: true, data: products })
            }

            // Busca por categoria //
            if (categoryId) {
                const key = `${CATEGORY}${categoryId}`

                // Buscando no cache //
                if (redisEnable) {
                    const cache = await redisTools.findCache(key, options);
                    if (cache != null) {
                        return routerCommon.sendResponse(res, { success: true, data: JSON.parse(cache) });
                    }
                }

                // Buscando o produto por categoria //
                const products = await Product.find({ categoryId: categoryId })

                // Caso haja resultados, inserindo no cache para futuras requisições/
                if (products && redisEnable) {
                    // Inserindo no cache de 30 segundos //
                    await redisTools.cache(options, key, products, 30);
                }

                return routerCommon.sendResponse(res, { success: true, data: products })
            }

            // Busca geral //
            const products = await Product.find();
            return routerCommon.sendResponse(res, { success: true, data: products });
        } catch (e) {
            console.log(e)
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao fazer a busca por produto(s).',
                data: e
            })
        }
    }

    async function update(req, res) {
        try {
            const { id } = req.query;

            // Verificando se existe o produto //
            const hasProduct = await Product.findOne({ _id: id });
            if (!hasProduct) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Esse produto não existe!'
                })
            }

            const values = req.body;

            // Obtendo e atualizando no Mongo //
            await Product.findByIdAndUpdate(id, values);

            // Obtendo os dados atualizados //
            const product = await Product.findOne({ _id: id })
            return routerCommon.sendResponse(res, { success: true, data: product })
        } catch (e) {
            console.log(e)
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao atualizar um produto',
                data: e
            })
        }
    }

    async function del(req, res) {
        try {
            const { id } = req.params;

            // Verificando se existe o produto //
            const hasProduct = await Product.findOne({ _id: id });
            if (!hasProduct) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Esse produto não foi encontrado no banco de dados.'
                })
            }

            // Removendo no Mongo //
            await Product.findByIdAndRemove({ _id: id });

            return routerCommon.sendResponse(res, { success: true, message: 'Produto deletado com sucesso.' });
        } catch (e) {
            console.log(e)
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao deletar um produto',
                data: e
            })
        }
    }

    return {
        create,
        get,
        update,
        del
    }
};
