const controller = require('../../controllers/product.controller.js')
const common = require('../../common/router.common.js')
const environments = require('../../common/environments.js')
const Category = require('../../models/category.model.js')

/**
 * @name ProductRouterCommon - Common da rota de produtos
 */
class ProductRouterCommon {

    /**
     * @name list - Obtem todos os produtos cadastrados
     *
     * @param {Request} req
     * @param {Response} res
     *
     * @returns Objeto
     */
     list = (req, res, options = {}) => {
        return controller.get(req, res, options)

        // Sucesso //
        .then(data => common.sendResponse(res, data))

        // Error
        .catch(data => common.sendResponse(res, data))
    }

    /**
     * @name create - Criar um novo produto
     *
     * @param {Request} req
     * @param {Response} res
     *
     * @returns Objeto
     */
    create = (req, res) => {
        return controller.create(req)

        // Sucesso //
        .then(data => common.sendResponse(res, data))

        // Error
        .catch(data => common.sendResponse(res, data))
    }

    /**
     * @name update - Atualiza um produto
     *
     * @param {Request} req
     * @param {Response} res
     *
     * @returns Objeto
     */
    update = (req, res) => {
        return controller.update(req)

        // Sucesso //
        .then(data => common.sendResponse(res, data))

        // Error
        .catch(data => common.sendResponse(res, data))
    }

    /**
     * @name del - Deleta um produto
     *
     * @param {Request} req
     * @param {Response} res
     *
     * @returns Objeto
     */
    del = (req, res) => {
        return controller.del(req)

        // Sucesso //
        .then(data => common.sendResponse(res, data))

        // Error
        .catch(data => common.sendResponse(res, data))
    }

    /**
     * @name parameters - Parâmetros adicionais
     *
     * @returns Função
     */
    parameters = () => {
        return {
            /**
             * @name sendError - Envia um response de erro
             *
             * @param {Response} res
             * @param {String} message
             *
             * @returns Response
             */
             sendError(res, message) {
                return common.sendResponse(res, {
                    code: environments.code.REQUEST,
                    success: false,
                    message: message
                })
            },

            /**
             * @name create - Verifica se está sendo informado o título, descrição, preço e id de categoria
             *
             * @param {Request} req
             * @param {Response} res
             * @param {Object} callback
             *
             * @returns Object
             *
             */
            create(req, res, callback) {
                const { title, description, price, categoryId } = req.body;

                // Verificando se o nome do produto está informado //
                if (!title) {
                    sendError(res, "O nome do produto não está informado! Campo 'title' faltando")
                    return callback(true, null);
                }

                // Verificando se a descrição do produto está informada //
                if (!description) {
                    sendError(res, "A descrição do produto não está sendo informada! Campo 'description' faltando");
                    return callback(true, null);
                }

                // Verificando se o preço do produto está informado //
                if (!price) {
                    sendError(res, "O preço do produto não está sendo informado! Campo 'price' faltando")
                    return callback(true, null);
                } else {
                    // Verificando se o preço do produto é do tipo numérico //
                    if (typeof price != 'number') {
                        sendError(res, "O preço do produto deve ser valor numérico")
                        return callback(true, null);
                    }
                }

                // Verificando se a categoria do produto está informada //
                if (!categoryId) {
                    sendError(res, "A categoria do produto não está sendo informada! Campo 'categoryId' faltando")
                    return callback(true, null);
                } else {
                    // Verificando se existe uma categoria com o ID informado //
                    Category.findById(categoryId)
                    .then(data => {
                        if (data == null) {
                            sendError(res, `A categoria '${categoryId}' não existe no banco de dados!`);
                            return callback(true, null);
                        }
                    }).catch(err => {
                        this.sendError(res, err)
                    })
                }

                return callback(null, true);
            },

            /**
             * @name del - Verifica se o ID está sendo informado.
             *
             * @param {Request} req
             * @param {Response} res
             * @param {Object} callback
             *
             * @returns Object
             */
            del(req, res, callback) {
                const { id } = req.params;
                if (!id) {
                    sendError(res, 'O id do produto não está sendo informado!')
                    return callback(true, null);
                }

                return callback(null, true);
            }
        }
    }

}

module.exports = new ProductRouterCommon()
