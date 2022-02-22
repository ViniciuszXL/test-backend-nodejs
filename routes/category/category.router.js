import categoryRouterCommon from "./category.router.common.js";
import express from 'express'

export default function categoryRouter() {

    const common = new categoryRouterCommon();

    function getName() {
        return "Category"
    }

    function getRoutes(options = {}) {
        const route = express.Router();

        // Rotas POST //
        route.post('/category', async (req, res) => {
            common.parameters().create(req, res, err => {
                if (!err) {
                    return common.create(req, res);
                }
            });
        })

        // Rotas GET //
        route.get('/category', [ common.list ])

        // Rotas PUT //
        route.put('/category', [ common.update ])

        // Rotas DEL //
        route.delete('/category/:id', [ common.del ])

        return route
    }

    return {
        getName,
        getRoutes
    }
}
