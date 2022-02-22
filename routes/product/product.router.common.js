import ProductController from '../../controllers/product.controller.js'
import RouterCommon from '../../common/router.common.js';
import environments from '../../common/environments.js';
import { Category } from '../../models/category.model.js';

export default function productRouterCommon() {

    const controller = new ProductController();
    const routerCommon = new RouterCommon();

    async function create(req, res) {
        return await controller.create(req, res);
    }

    async function list(req, res, options = {}) {
        return await controller.get(req, res, options);
    }

    async function update(req, res) {
        return await controller.update(req, res);
    }

    async function del(req, res) {
        return await controller.del(req, res);
    }

    function parameters() {

        function sendError(res, message) {
            return routerCommon.sendResponse(res, {
                code: environments.CODE.REQUEST,
                success: false,
                message: message
            })
        }

        async function create(req, res, callback) {
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
                const _exists = await Category.findById(categoryId);
                if (!_exists) {
                    sendError(res, `A categoria '${categoryId}' não existe no banco de dados!`);
                    return callback(true, null);
                }
            }

            return callback(null, true);
        }

        function del(req, res, callback) {
            const { id } = req.params;
            if (!id) {
                sendError(res, 'O id do produto não está sendo informado!')
                return callback(true, null);
            }

            return callback(null, true);
        }

        return {
            create,
            del
        }
    }

    return {
        create,
        list,
        update,
        del,

        parameters
    }
}
