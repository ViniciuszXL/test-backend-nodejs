import RouterCommon from "../../common/router.common.js";
import CategoryController from "../../controllers/category.controller.js"
import environments from "../../common/environments.js";

export default function categoryRouterCommon() {

    const controller = new CategoryController();
    const routerCommon = new RouterCommon();

    async function list(req, res) {
        return await controller.get(req, res);
    }

    async function create(req, res, next) {
        return await controller.create(req, res, next);
    }

    async function update(req, res, next) {
        return await controller.update(req, res, next);
    }

    async function del(req, res, next) {
        return await controller.del(req, res, next);
    }

    function parameters() {

        function sendError(res, message) {
            return routerCommon.sendResponse(res, {
                code: environments.CODE.REQUEST,
                success: false,
                message: message
            })
        }

        function create(req, res, callback) {
            const { name } = req.body;

            // Verificando se o nome da categoria está informada //
            if (!name){
                sendError(res, "O nome da categoria não está informado! Campo 'name' faltando")
                return callback(true);
            }

            return callback(undefined, true);
        }

        return {
            create
        }
    }

    return {
        list,
        create,
        update,
        del,

        parameters
    }
}
