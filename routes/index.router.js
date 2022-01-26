import indexRouterCommon from "./index.router.common.js";

export default function indexRouter() {

    const common = new indexRouterCommon();

    function getName() {
        return "Index"
    }

    function apply(options = {}) {
        const { server } = options;

        // Rotas GET //
        server.get('/', [ common.get ])
    }

    return {
        getName,
        apply
    }
}
