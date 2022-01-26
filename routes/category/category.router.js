import categoryRouterCommon from "./category.router.common.js";

export default function categoryRouter() {

    const common = new categoryRouterCommon();

    function getName() {
        return "Category"
    }

    function apply(options = {}) {
        const { server, redis, mongo } = options;

        // Rotas POST //
        server.post('/category', [ common.create ])

        // Rotas GET //
        server.get('/category', [ common.list ])

        // Rotas PUT //
        server.put('/category', [ common.update ])

        // Rotas DEL //
        server.del('/category/:id', [ common.del ])
    }

    return {
        getName,
        apply
    }
}
