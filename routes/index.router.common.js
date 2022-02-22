class IndexRouterCommon {

    /**
     * @name get - Obtem as informações da aplicação
     *
     * @param {Response} res
     *
     * @returns Response
     */
    get = (res) => {
        return res.json({
            "success": true,
            "version": "1.0.0",
            "description": "RESTAPI de catálogo de produtos do desafio da AnotaAí",
            "routes": {
                "category": '/category',
                "products": '/products'
            }
        })
    }

}

module.exports = new IndexRouterCommon();
