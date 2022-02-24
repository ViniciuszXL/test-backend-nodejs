const common = require('../../common/router.common.js')
const controller = require('../../controllers/category.controller.js')
const environments = require('../../common/environments.js')

/**
 * @name CategoryRouterCommon - Common da rota da categoria
 */
class CategoryRouterCommon {

    /**
     * @name list - Obtém todas as categorias cadastradas
     *
     * @param {Request} req
     * @param {Response} res
     *
     * @returns Objeto
     */
    list = (req, res) => {
        return controller.get()

        // Sucesso //
        .then(data => common.sendResponse(res, data))

        // Error
        .catch(data => common.sendResponse(res, data))
    }

    /**
     * @name create - Criar uma nova categoria
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
     * @name update - Atualiza uma categoria
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

        // Error //
        .catch(data => common.sendResponse(res, data))
    }

    /**
     * @name del - Deleta uma categoria
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

        // Error //
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
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: message
                })
            },

            /**
             * @name create - Verifica se o nome da categoria está sendo informada na requisição
             *
             * @param {Request} req
             * @param {Response} res
             * @param {Object} callback
             *
             * @returns Object
             *
             */
            create(req, res, callback) {
                const { name } = req.body;

                // Verificando se o nome da categoria está informada //
                if (!name) {
                    this.sendError(res, "O nome da categoria não está informado! Campo 'name' faltando")
                    return callback(true)
                }

                return callback(undefined, true);
            }
        }
    }
}

module.exports = new CategoryRouterCommon()
