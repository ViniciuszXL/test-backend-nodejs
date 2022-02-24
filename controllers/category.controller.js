const Category = require('../models/category.model.js');
const Product = require('../models/product.model.js');

const {
    sendErrorIntern,
    sendErrorRequest
} = require('../common/utilitaries.js')

/**
* @name create - Cria uma nova categoria
*
* @param { Request } req
*
* @returns JSON
*/
const create = (req) => {
    return new Promise((resolve, reject) => {
        const { name } = req.body;

        // Verificando se existe um categoria //
        Category.findOne({ name })
        // Categoria existente //
        .then((data) => {
            if (data != null) {
                return reject(sendErrorRequest('Categoria já existente'))
            }

            // Criando uma nova categoria //
            Category.create({ name: name })
            // Categoria criada com sucesso /
            .then((data) => {
                resolve({
                    success: true,
                    message: 'Categoria criada com sucesso',
                    data: data
                })
            })
            // Ocorreu um erro ao criar a categoria //
            .catch(err => {
                reject(sendErrorIntern('Ocorreu um erro ao criar uma nova categoria', err));
            })
        })
        // Categoria inexistente //
        .catch(err => {
            reject(sendErrorIntern('Ocorreu um erro ao buscar uma categoria', err));
        });
    });
}

/**
 * @name get - Obtém todas as categorias
 *
 * @returns JSON
 */
const get = () => {
    return new Promise((resolve, reject) => {
        // Obtendo todas as categorias //
        Category.find()

        // Categorias obtidas com sucesso /
        .then(categories => {
            resolve({
                success: true,
                data: categories
            })
        })

        // Ocorreu um erro //
        .catch(err => {
            reject(sendErrorIntern('Ocorreu um erro ao buscar as categorias no servidor.', err));
        });
    });
};

/**
 * @name update - Atualiza uma categoria
 *
 * @param {Request} req
 *
 * @returns JSON
 */
const update = (req) => {
    return new Promise((resolve, reject) => {
        const { id } = req.query;

        // Atualizando a categoria //
        Category.findByIdAndUpdate(id, req.body)

        // Atualização feita com sucesso //
        .then((data) => {
            if (data == null) {
                return reject(sendErrorRequest('Categoria não foi encontrada na base de dados!'))
            }

            // Obtendo a categoria //
            Category.findOne({ _id: id })

            // Categoria encontrada com sucesso //
            .then((data) => {
                resolve({
                    success: true,
                    data: data
                })
            })

            // Ocorreu um erro ao encontrar a categoria //
            .catch(err => {
                reject(sendErrorIntern('Ocorreu um erro ao buscar a categoria na base de dados.', err))
            })
        })

        // Categoria não encontrada //
        .catch(err => {
            reject(sendErrorIntern('Ocorreu um erro ao buscar e atualizar uma categoria na base de dados.', err))
        })
    });
}

/**
 * @name del - Deletar uma categoria
 *
 * @param {Request} req
 *
 * @returns JSON
 */
const del = (req) => {
    return new Promise((resolve, reject) => {
        const { id } = req.params;

        // Verificando se existe a categoria //
        Category.findOne({ _id: id })
        // Sucesso //
        .then(data => {
            if (data == null) {
                return reject(sendErrorRequest('Categoria não foi encontrada na base de dados!'))
            }

            // Verificando se existe e removendo a categoria //
            Category.findByIdAndRemove({ _id: id })
            // Verificado e removido com sucesso //
            .then(() => {
                // Deletando todos os produtos da categoria //
                Product.deleteMany({ categoryId: id })
                // Produtos deletados com sucesso //
                .then(() => {
                    resolve({
                        success: true,
                        message: 'Categoria e seus produtos deletados com sucesso.'
                    })
                })
                // Ocorreu um erro na criação do produto //
                .catch(err => {
                    reject(sendErrorIntern('Ocorreu um erro ao deletar todos os produtos referentes à categoria.', err))
                })
            })
            // Categoria não encontrada //
            .catch(err => {
                reject(sendErrorIntern('Ocorreu um erro ao buscar e remover a categoria no servidor.', err))
            })
        })
        // Categoria não encontrada //
        .catch(err => {
            reject(sendErrorIntern('Ocorreu um erro ao buscar e remover a categoria no servidor.', err))
        })
    });
}

module.exports = {
    create,
    get,
    update,
    del
};
