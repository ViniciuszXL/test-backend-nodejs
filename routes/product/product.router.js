import productRouterCommon from "./product.router.common.js";

export default function productRouter() {

    const common = new productRouterCommon();

    function getName() {
        return "Product"
    }

    function apply(options = {}) {
        const { server } = options;

        // Rotas POST //
        server.post('/product', [ common.create ])

        // Rotas GET //
        server.get('/product/search', [ common.list ])
    }

    return {
        getName,
        apply
    }
}
