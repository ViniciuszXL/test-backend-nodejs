const Product = require('../models/product.model.js')
const common = require('../common/router.common.js');
const environments = require('../common/environments.js');
const tools = require('../services/redis/redis.tools.js');

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
                resolve({
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Produto já cadastrado nessa categoria!'
                })

                return;
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
                reject({
                    code: environments.CODE.INTERN,
                    success: false,
                    message: 'Ocorreu um erro no registro do produto.',
                    data: err
                })
            })
        })

        // Error //
        .catch(reject);
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

            // Buscando  no cache //
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

                // Error //
                .catch(reject)
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
            reject({
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao buscar todos os produtos',
                data: e
            })
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

        const sendError = (message, data) => {
            return {
                code: environments.CODE.INTERN,
                success: false,
                message: message,
                data: data
            }
        }

        // Buscando um produto //
        Product.findOne({ _id: id })
        // Sucesso //
        .then(data => {
            if (data == null) {
                return reject({
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Esse produto não existe!'
                })
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
                    reject(sendError('Ocorreu um erro ao buscar o produto atualizado', err))
                })
            })
            // Error
            .catch((err) => {
                reject(sendError('Ocorreu um erro ao atualizar um produto', err))
            })
        })
        // Error
        .catch((err) => {
            reject(sendError('Ocorreu um erro ao buscar o produto atualizado', err))
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
                return reject({
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Esse produto não foi encontrado no banco de dados.'
                })
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
                reject({
                    code: environments.code.INTERT,
                    success: false,
                    message: message,
                    data: data
                })
            })
        })
        // Error //
        .catch((data) => {
            reject({
                code: environments.code.INTERT,
                success: false,
                message: message,
                data: data
            })
        })
    })
}

module.exports = {
    create,
    get,
    update,
    del
}
