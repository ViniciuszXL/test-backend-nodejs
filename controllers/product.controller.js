const Product = require('../models/product.model.js')
const environments = require('../common/environments.js');
const tools = require('../services/redis/redis.tools.js');

const {
    sendErrorIntern,
    sendErrorRequest
} = require('../common/utilitaries.js')

const redisEnable = environments.REDIS.ENABLE != 1 ? false : true;

/**
 * @name create - Cria um novo produto
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @returns JSON
 */
const create = (req, res) => {
    return new Promise((resolve, reject) => {
        const { title, categoryId } = req.body;

        // Verificando a existência do produto //
        Product.findOne({ title: title, categoryId: categoryId })
        // Sucesso //
        .then((data) => {
            if (data != null) {
                return resolve(sendErrorRequest('Produto já cadastrado nessa categoria!'))
            }

            // Criando o produto //
            Product.create(req.body)
            // Criado com sucesso //
            .then(data => {
                resolve({
                    success: true,
                    message: 'Produto criado com sucesso',
                    data: data
                })
            })
            // Error //
            .catch(err => {
                reject(sendErrorIntern('Ocorreu um erro no registro do produto.', err))
            })
        })
        // Error //
        .catch(err => {
            reject(sendErrorIntern('Ocorreu um erro ao verificar se o produto já existe.', err))
        });
    });
}

/**
 * @name get - Cria um novo produto
 *
 * @param {Request} req
 * @param {Response} res
 * @param {JSON} options
 *
 * @returns JSON
 */
const get = (req, res, options = {}) => {
    return new Promise((resolve, reject) => {
        const { TITLE, CATEGORY, ALL } = environments.REDIS.KEY.PRODUCT.CACHE;
        const { title, categoryId } = req.query;

        // Busca por título e categoria //
        if (title && categoryId) {
            const key = `${ALL}`;

            const find = () => {
                return new Promise((resolve, reject) => {
                    // Product //
                    Product.find({ $and: [{ title: title }, { categoryId: categoryId }] })
                    // Sucesso //
                    .then(data => {
                        if (data == null) {
                            return reject(sendErrorRequest('Produto informado não foi encontrado na base de dados.'))
                        }

                        // Inserindo no cache do Redis //
                        tools.cache(options, key, data, 30)
                        // Sucesso //
                        .then(() => {
                            resolve({ success: true, data: data })
                        })
                        // Error
                        .catch(err => reject(sendErrorIntern('Ocorreu um erro ao inserir um dado no Redis', err)))
                    })
                    // Error
                    .catch(err => reject(sendErrorIntern('Ocorreu um erro ao buscar o produto na base de dados', err)))
                })
            };

            // Buscando  no cache //
            if (redisEnable) {
                // Obtendo no cache //
                tools.findCache(key, options)
                // Sucesso //
                .then(data => {
                    if (data != null) {
                        return resolve({ success: true, data: JSON.parse(cache) })
                    }

                    find().then(resolve).catch(reject);
                })
                // Error //
                .catch(err => reject(sendErrorIntern('Ocorreu um erro ao buscar dados no Redis', err)))
            } else {
                find().then(resolve).catch(reject);
            }

            return;
        }

        // Busca por título //
        if (title) {
            const key = `${TITLE}${title.toUpperCase().replace(' ', '')}`

            const find = () => {
                return new Promise((resolve, reject) => {
                    // Product //
                    Product.find({ title: title })
                    // Sucesso //
                    .then(data => {
                        if (data == null) {
                            return reject(sendErrorRequest('Produto informado não foi encontrado na base de dados.'))
                        }

                        // Inserindo no cache do Redis //
                        tools.cache(options, key, data, 30)
                        // Sucesso //
                        .then(() => {
                            resolve({ success: true, data: data })
                        })
                        // Error
                        .catch(err => reject(sendErrorIntern('Ocorreu um erro ao inserir um dado no Redis', err)))
                    })
                    // Error
                    .catch(err => reject(sendErrorIntern('Ocorreu um erro ao buscar o produto na base de dados', err)))
                })
            };

            if (redisEnable) {
                // Obtendo no cache //
                tools.findCache(key, options)
                // Sucesso //
                .then(data => {
                    if (data != null) {
                        return resolve({ success: true, data: JSON.parse(cache) })
                    }

                    find().then(resolve).catch(reject);
                })
                // Error //
                .catch(err => reject(sendErrorIntern('Ocorreu um erro ao buscar dados no Redis', err)))
            } else {
                find().then(resolve).catch(reject)
            }

            return;
        }

        // Busca por categoria //
        if (categoryId) {
            const key = `${CATEGORY}${categoryId}`

            const find = () => {
                return new Promise((resolve, reject) => {
                    // Product //
                    Product.find({ categoryId: categoryId })

                    // Sucesso //
                    .then(data => {
                        if (data == null) {
                            reject({
                                code: environments.CODE.REQUEST,
                                success: false,
                                message: 'Produto informado não foi encontrado na base de dados.'
                            })
                        } else {
                            tools.cache(options, key, data, 30)
                            .then(() => {
                                resolve({
                                    success: true,
                                    data: data
                                })
                            }).catch(reject)
                        }
                    })
                    .catch(reject)
                })
            };

            if (redisEnable) {
                // Obtendo no cache //
                tools.findCache(key, options)
                // Sucesso //
                .then(data => {
                    if (data != null) {
                        resolve({
                            success: true,
                            data: JSON.parse(cache)
                        })
                    } else {
                        find().then(resolve).catch(reject);
                    }
                })
            } else {
                find().then(resolve).catch(reject)
            }

            return;
        }

        // Busca por todos os produtos //
        Product.find()

        // Sucesso //
        .then(data => {
            resolve({
                success: true,
                data: data
            })
        })

        .catch(err => {
            reject(sendErrorIntern('Ocorreu um erro ao buscar todos os produtos', err))
        })
    });
}

/**
 * @name update - Atualiza as informações de um produto
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @returns JSON
 */
const update = (req, res) => {
    return new Promise((resolve, reject) => {
        const { id } = req.query;

        // Buscando um produto //
        Product.findOne({ _id: id })
        // Sucesso //
        .then(data => {
            if (data == null) {
                return reject(sendErrorRequest('Esse produto não existe!'))
            }

            // Buscando o produto por ID e atualizando os valores //
            Product.findByIdAndUpdate(id, req.body)
            // Sucesso //
            .then(() => {
                Product.findOne({ _id: id })
                // Sucesso //
                .then(data => {
                    resolve({
                        success: true,
                        message: 'Produto atualizado com sucesso.',
                        data: data
                    })
                })
                // Error //
                .catch((err) => {
                    reject(sendErrorIntern('Ocorreu um erro ao buscar o produto atualizado', err))
                })
            })
            // Error
            .catch((err) => {
                reject(sendErrorIntern('Ocorreu um erro ao atualizar um produto', err))
            })
        })
        // Error
        .catch((err) => {
            reject(sendErrorIntern('Ocorreu um erro ao buscar o produto atualizado', err))
        })
    });
}

/**
 * @name del - Deleta um produto
 *
 * @param {Request} req
 * @param {Response} res
 *
 * @returns JSON
 */
const del = (req, res) => {
    return new Promise((resolve, reject) => {
        const { id } = req.params;

        // Verificando se existe o produto //
        Product.findOne({ _id: id })
        // Sucesso //
        .then(data => {
            if (data == null) {
                return reject(sendErrorRequest('Esse produto não foi encontrado no banco de dados.'))
            }

            // Obtendo o produto e deletando //
            Product.findByIdAndDelete({ _id: id })
            // Sucesso //
            .then(() => {
                resolve({
                    success: true,
                    message: 'Produto deletado com sucesso.'
                })
            })
            // Error //
            .catch((data) => {
                reject(sendErrorIntern('Ocorreu um erro ao buscar e deletar o produto na base de dados.', data))
            })
        })
        // Error //
        .catch((data) => {
            reject(sendErrorIntern('Ocorreu um erro ao buscar o produto na base de dados.', data))
        })
    })
}

module.exports = {
    create,
    get,
    update,
    del
}
