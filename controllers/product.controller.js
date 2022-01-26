import { Product } from '../models/product.model.js'
import RouterCommon from '../common/router.common.js';
import environments from '../common/environments.js';

export default function ProductController() {

    const routerCommon = new RouterCommon();

    async function create(req, res) {
        try {
            const { title } = req.body;

            const hasProduct = await Product.findOne({ title: title });
            if (hasProduct.length > 0) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Produto já existe'
                })
            }

            const _product = await Product.create(req.body);
            return routerCommon.sendResponse(res, { success: true, message: 'Produto criado com sucesso', data: _product })
        } catch (e) {
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro no registro do produto.',
                data: e
            }), console.log(e)
        }
    }

    async function get(req, res) {
        try {
            const { title, categoryId } = req.query;

            // Busca por título e categoria //
            if (title && categoryId) {
                const products = await Product.find({ $and: [{ title: title }, { categoryId: categoryId }]})
                return routerCommon.sendResponse(res, { success: true, data: products })
            }

            // Busca por título //
            if (title) {
                const products = await Product.find({ title: title })
                return routerCommon.sendResponse(res, { success: true, data: products })
            }

            // Busca por categoria //
            if (categoryId) {
                const products = await Product.find({ categoryId: categoryId })
                return routerCommon.sendResponse(res, { success: true, data: products })
            }

            // Busca geral //
            const products = await Product.find();
            return routerCommon.sendResponse(res, { success: true, data: products });
        } catch (e) {
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao fazer a busca por produto(s).',
                data: e
            }), console.log(e)
        }
    }

    async function update(req, res) {
        try {
            const { id } = req.params;
            const values = req.body;

            // Obtendo e atualizando no Mongo //
            await Product.findByIdAndUpdate(id, values);
            return routerCommon.sendResponse(res, { success: true, data: values })
        } catch (e) {
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao atualizar um produto',
                data: e
            }), console.log(e)
        }
    }

    async function del(req, res) {
        try {
            const { id } = req.params;
            const _exists = await Product.findById(id);
            if (_exists) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Esse produto não foi encontrado na base de dados.'
                })
            }

            // Removendo no Mongo //
            await Product.findByIdAndRemove({
                _id: id
            });

            return routerCommon.sendResponse(res, { success: true, message: 'Produto deletado com sucesso.' });
        } catch (e) {
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao deletar um produto',
                data: e
            }), console.log(e)
        }
    }

    return {
        create,
        get,
        update,
        del
    }
};
