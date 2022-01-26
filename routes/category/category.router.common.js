import CategoryController from "../../controllers/category.controller.js"

export default function categoryRouterCommon() {

    const controller = new CategoryController();

    async function list(req, res, next) {
        return await controller.get(req, res, next);
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

    return {
        list,
        create,
        update,
        del
    }
}
