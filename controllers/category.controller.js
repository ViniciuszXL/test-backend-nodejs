import { Category } from '../models/category.model.js';
import { Product } from '../models/product.model.js';

import RouterCommon from '../common/router.common.js';
import environments from '../common/environments.js';

export default function CategoryController() {

    const routerCommon = new RouterCommon();

    async function create(req, res) {
        try {
            const { name } = req.body;

            // Verificando se existe a categoria //
            const hasCategory = await Category.findOne({ name });
            if (hasCategory) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Categoria já existente'
                })
            }

            // Criando nova categoria //
            const _category = await Category.create({ name: name });
            return routerCommon.sendResponse(res, { success: true, message: 'Categoria criada com sucesso', data: _category })
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
            // Obtendo todas as categorias //
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

            // Verificando se existe a categoria
            const hasCategory = await Category.findOne({ _id: id })
            if (!hasCategory) {
                return routerCommon.sendResponse(res, {
                    success: false,
                    code: environments.CODE.REQUEST,
                    message: 'Essa categoria não existe!'
                })
            }

            // Obtendo e atualizando no Mongo //
            await Category.findByIdAndUpdate(id, req.body);

            // Obtendo as novas informações //
            const category = await Category.findOne({ _id: id });
            return routerCommon.sendResponse(res, { success: true, data: category });
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

            // Verificando se existe a categoria
            const hasCategory = await Category.findById(id);
            if (!hasCategory) {
                return routerCommon.sendResponse(res, {
                    code: environments.CODE.REQUEST,
                    success: false,
                    message: 'Categoria não encontrada no banco de dados.'
                })
            }

            // Obtendo e removendo no Mongo //
            await Category.findByIdAndRemove({ _id: id });

            // Removendo os produtos da categoria //
            await Product.deleteMany({ categoryId: id })

            return routerCommon.sendResponse(res, { success: true, message: 'Categoria e seus produtos deletados com sucesso.' });
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
