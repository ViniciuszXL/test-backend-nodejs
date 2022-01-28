import productRouterCommon from "./product.router.common.js";
import express from 'express'

export default function productRouter() {

    const common = new productRouterCommon();

    function getName() {
        return "Product"
    }

    function getRoutes(options = {}) {
        const route = express.Router();

        // Rotas POST //
        route.post('/product', async (req, res) => {
            common.parameters().create(req, res, async (err) => {
                if (!err) {
                    return await common.create(req, res);
                }
            })
        })

        // Rotas GET //
        route.get('/product', async (req, res) => await common.list(req, res, options))

        // Rotas PUT //
        route.put('/product', common.update)

        // Rotas DEL //
        route.delete('/product/:id', async (req, res) => {
            common.parameters().del(req, res, async (err) => {
                if (!err) {
                    return await common.del(req, res);
                }
            })
        })

        return route
    }

    return {
        getName,
        getRoutes
    }
}
