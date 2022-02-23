const jestCli = require('jest-cli');
const core = require('./core-app.js');

// Models //
const Category = require('./models/category.model.js')
const Product = require('./models/product.model.js')

// Local variables //
let services;

const beforeTests = () => {
    // Iniciando a classe do core //
    const options = { database: 'tests' };

    // Iniciando os serviços //
    return core.start(options).then((_services) => {
        services = _services;

        Category.deleteMany({})

        .then(() => {
            Product.deleteMany({})

            .then(() => {
                console.log('Categorias e produtos deletados com sucesso.')
            })

            .catch(err => {
                console.log(err);
            })
        })

        .catch(err => {
            console.log(err);
        })
    }).catch(console.log)
}

const afterTests = () => {
    return core.stop(services)
}


// Inicio dos testes //
beforeTests()

// Iniciando os testes unitários //
.then(() => jestCli.run())

// Testes unitários concluídos, iniciando o stop dos serviços //
.then(() => afterTests())

// Ocorreu um erro ao fechar os serviços //
.catch(console.log)
