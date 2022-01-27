import request from 'supertest';
import createCore from '../../core-app.js';

// Models //
import { Category } from '../../models/category.model.js';

let core_app;
let services;

// Antes de tudo //
beforeAll(async () => {
    const options = { database: 'tests' };

    // Iniciando a classe do core //
    core_app = new createCore();

    // Iniciando os serviços //
    services = await core_app.start(options);

    // Removendo as categorias //
    await Category.remove({}).exec();

    // Retornando //
    return services;
});

describe('POST - Category', () => {
    test('Deve criar uma nova categoria', () => {

        request('http://localhost:4444')

        // Método POST //
        .post('/category')

        // Enviando o body //
        .send({
            name: 'Nova categoria teste'
        })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.success).toBeDefined()

            // Data //
            expect(response.body.data.name).toBe('Nova categoria teste')
            expect(response.body.data._id).toBeDefined()
            expect(response.body.data.createdAt).toBeDefined()
            expect(response.body.data.updatedAt).toBeDefined()
        })
    });
});

// Depois de tudo //
afterAll(() => {
    return core_app.stop(services)
});
