import indexRouterCommon from "./index.router.common.js";
import express from 'express';

export default function indexRouter() {

    const common = new indexRouterCommon();

    function getName() {
        return "Index"
    }

    function getRoutes(options = {}) {
        // Route //
        const route = express.Router();

        // Rotas GET //
        route.get('/', [ common.get ])

        return route;
    }

    return {
        getName,
        getRoutes
    }
}
