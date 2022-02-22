const common = require("./index.router.common.js");
const express = require('express');

class IndexRouter {

    /**
     * @name getName - Obtém o nome da rota
     *
     * @returns String
     */
    getName() {
        return "Index"
    }

    /**
     * @name getRoutes - Obtem todas as rotas da classe
     *
     * @param {JSON} options
     *
     * @returns Routes
     */
    getRoutes(options = {}) {
        // Route //
        const route = express.Router();

        // Rotas GET //
        route.get('/', [ common.get ])

        return route;
    }

}

module.exports = new IndexRouter();
