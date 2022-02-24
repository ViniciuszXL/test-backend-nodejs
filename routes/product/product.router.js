const common = require('./product.router.common.js')
const express = require('express')

class ProductRouter {

    /**
     * @name getName - Obtém o nome da rota
     *
     * @returns String
     */
    getName = () => {
        return "Product"
    }

    /**
     * @name getRoutes - Obtem todas as rotas da classe
     *
     * @param {JSON} options
     *
     * @returns Routes
     */
    getRoutes = (options = {}) => {
        const route = express.Router();

        // Rotas POST //
        route.post('/product', (req, res) => {
            common.parameters().create(req, res, (err) => {
                if (!err) {
                    return common.create(req, res);
                }
            })
        })

        // Rotas GET //
        route.get('/product', (req, res) => {
            return common.list(req, res, options);
        })

        // Rotas PUT //
        route.put('/product', [ common.update ])

        // Rotas DEL //
        route.delete('/product/:id', (req, res) => {
            common.parameters().del(req, res, (err) => {
                if (!err) {
                    return common.del(req, res);
                }
            })
        })

        return route
    }

}

module.exports = new ProductRouter()
