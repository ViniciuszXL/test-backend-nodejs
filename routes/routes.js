import indexRouter from './index.router.js';
import categoryRouter from './category/category.router.js'

export default function routes() {

    function start(options = {}) {
        return new Promise((resolve, reject) => {
            console.log('> [routes] Iniciando as rotas...');

            try {
                const routes = [ indexRouter(), categoryRouter() ]
                for (var router of routes) {
                    router.apply(options)
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
