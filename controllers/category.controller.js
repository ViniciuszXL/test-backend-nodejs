const { Category } = require('../models/category.model.js');
const { Product } = require('../models/product.model.js');
const environments = require('../common/environments.js');

/**
* @name create
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
            if (!data) {
                reject({
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Categoria já existente'
                })

                return;
            }

            // Criando uma nova categoria //
            Category.create({ name: name })

            // Categoria criada com sucesso /
            .then((data) => {
                console.log(data);
                resolve({
                    success: true,
                    message: 'Categoria criada com sucesso',
                    data: data
                })
            })

            // Ocorreu um erro ao criar a categoria //
            .catch(err => {
                console.log(err);
                reject(err);
            })
        })

        // Categoria inexistente //
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

/**
 * @name get - Obter todas as categorias
 *
 * @returns JSON
 */
const get = () => {
    return new Promise((resolve, reject) => {
        // Obtendo todas as categorias //
        Category.find()

        // Categorias obtidas com sucesso /
        .then(categories => {
            console.log(categories);
            resolve({
                success: true,
                data: categories
            })
        })

        // Ocorreu um erro //
        .catch(err => {
            console.log(err);
            reject(err);
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
        .then(() => {
            // Obtendo a categoria //
            Category.findOne({ _id: id })

            // Categoria encontrada com sucesso //
            .then((data) => {
                console.log(data)
                resolve({
                    success: true,
                    data: data
                })
            })

            // Ocorreu um erro ao encontrar a categoria //
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })

        // Categoria não encontrada //
        .catch(err => {
            console.log(err);
            reject(err)
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
                console.log(err);
                reject(err)
            })
        })

        // Categoria não encontrada //
        .catch(err => {
            console.log(err);
            reject(err)
        })
    });
}

module.exports = {
    create,
    get,
    update,
    del
};
