const common = require('./category.router.common.js')
const express = require('express')

class CategoryRouter {

    /**
     * @name getName - Obtém o nome da rota
     *
     * @returns String
     */
    getName = () => {
        return "Category"
    }

    /**
     * @name getRoutes - Obtem todas as rotas da classe
     *
     * @param {JSON} options
     *
     * @returns Routes
     */
    getRoutes(options = {}) {
        const route = express.Router();

        // Rotas POST //
        route.post('/category', (req, res) => {
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

}

module.exports = new CategoryRouter()
