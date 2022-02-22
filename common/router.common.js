class RouterCommon {

    /**
     * @name sendResponse - Envia um response a solicitação de um request
     *
     * @param {Request} req
     * @param {Object} options
     *
     * @returns Objeto
     */

    sendResponse(req, options = {}) {
        try {
            const { code, success } = options;

            if (success == undefined) {
                throw new Error('Não foi informado se a requisição foi bem sucedida.')
            }

            if (!success && code == undefined) {
                throw new Error('Código de response não foi informado!');
            }

            options.code = undefined;
            return res.status(success ? 200 : code).json(options)
        } catch (e) {
            throw new Error(e);
        }
    }

}

module.exports = RouterCommon;
