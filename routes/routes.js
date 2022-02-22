import indexRouter from './index.router.js';
import categoryRouter from './category/category.router.js'
import productRouter from './product/product.router.js';

export default function routes() {

    function start(options = {}) {
        return new Promise((resolve, reject) => {
            const { server } = options;
            console.log('> [routes] Iniciando as rotas...');

            try {
                const routes = [ indexRouter(), categoryRouter(), productRouter() ]
                for (var router of routes) {
                    server.use('/', router.getRoutes(options))
                    console.log(`> [routes] Rota '${router.getName()}' iniciada com sucesso!`)
                }

                console.log('> [routes] Todas as rotas foram iniciadas com sucesso.');
                resolve(true)
            } catch (e) {
                throw new Error(e), console.log('> [routes] Ocorreu um erro ao iniciar as rotas'), console.log(e), reject(false)
            }
        });
    }

    return {
        start
    }
}
