import ProductController from '../../controllers/product.controller.js'

export default function productRouterCommon() {

    const controller = new ProductController();

    async function create(req, res, next) {
        return await controller.create(req, res);
    }

    async function list(req, res, next) {
        return await controller.get(req, res);
    }

    return {
        create,
        list
    }
}
