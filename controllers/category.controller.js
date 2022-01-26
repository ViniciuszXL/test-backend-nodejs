import { Category } from '../models/category.model.js';
import { Product } from '../models/product.model.js';

import RouterCommon from '../common/router.common.js';
import environments from '../common/environments.js';

export default function CategoryController() {

    const routerCommon = new RouterCommon();

    async function create(req, res) {
        try {
            const { name } = req.body;
            const _exists = await Category.findOne({ name });
            if (_exists) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Categoria já existe'
                })
            }

            const _category = await Category.create({ name: name });
            return routerCommon.sendResponse(res, {
                success: true,
                message: 'Categoria criada com sucesso',
                data: _category
            })
        } catch (e) {
            console.log(e)
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro no registro da categoria.',
                data: e
            })
        }
    }

    async function get(req, res) {
        try {
            const categories = await Category.find();
            return routerCommon.sendResponse(res, { success: true, data: categories });
        } catch (e) {
            console.log(e)
            return routerCommon.sendResponse(res, {
                code: environments.CODE.REQUEST,
                success: false,
                message: 'Ocorreu um erro na requisição.',
                data: e
            })
        }
    }

    async function update(req, res) {
        try {
            const { id } = req.query;

            // Obtendo e atualizando no Mongo //
            await Category.findByIdAndUpdate(id, req.body);
            return routerCommon.sendResponse(res, { success: true, data: req.body });
        } catch (e) {
            console.log(e)
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao atualizar a categoria',
                data: e
            })
        }
    }

    async function del(req, res) {
        try {
            const { id } = req.params;
            const _exists = await Category.findById(id);
            if (!_exists) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Essa categoria não foi encontrada na base de dados.'
                })
            }

            // Obtendo e removendo no Mongo //
            await Category.findByIdAndRemove({
                _id: id
            });

            // Atualizando os produtos //
            await Product.updateMany({ categoryId: { $in: id }}, {
                $pull: { categoryId: id }
            })

            return routerCommon.sendResponse(res, { success: true, message: 'Categoria deletado com sucesso.' });
        } catch (e) {
            console.log(e)
            return routerCommon.sendResponse(res, {
                code: environments.CODE.INTERN,
                success: false,
                message: 'Ocorreu um erro ao deletar uma categoria',
                data: e
            })
        }
    }

    return {
        create,
        get,
        update,
        del
    }
};
