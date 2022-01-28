import jestCli from 'jest-cli';
import createCore from './core-app.js';

// Models //
import { Category } from './models/category.model.js';
import { Product } from './models/product.model.js';

// Local variables //
let core_app, services;

const beforeTests = () => {
    // Iniciando a classe do core //
    const options = { database: 'tests' };
    core_app = new createCore();

    // Iniciando os serviços //
    return core_app.start(options).then(async (_services) => {
        services = _services;

        await Category.deleteMany({})
        await Product.deleteMany({})
    }).catch(console.log)
}

const afterTests = () => {
    return core_app.stop(services)
}


// Inicio dos testes //
beforeTests()

// Iniciando os testes unitários //
.then(() => jestCli.run())

// Testes unitários concluídos, iniciando o stop dos serviços //
.then(() => afterTests())

// Ocorreu um erro ao fechar os serviços //
.catch(console.log)
