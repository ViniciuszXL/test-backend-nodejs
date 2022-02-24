const indexRouter = require('./index.router.js');
const categoryRouter = require('./category/category.router.js')
const productRouter = require('./product/product.router.js')

class Routes {

    /**
     * @name start - Iniciando as rotas
     *
     * @param {JSON} options
     *
     */
    start = (options = {}) => {
        return new Promise((resolve, reject) => {
            const { server } = options;
            console.log('> [routes] Iniciando as rotas...');

            try {
                const routes = [ indexRouter, categoryRouter, productRouter ]
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

}

module.exports = new Routes();
