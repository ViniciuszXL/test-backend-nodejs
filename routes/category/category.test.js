const request = require('supertest');

// Local variables //
let address = global.address;

describe('POST - Category', () => {

    let categoryName = 'Olá mundo!';

    test('Deve criar uma categoria', () => {
        return request(address)

        // Método POST //
        .post('/category')

        // Enviando o body //
        .send({ name: categoryName })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)

            // Data //
            expect(response.body.data.name).toBe(categoryName)
            expect(response.body.data._id).toBeDefined()
            expect(response.body.data.createdAt).toBeDefined()
            expect(response.body.data.updatedAt).toBeDefined()
        })
    });

    test('Deve dar erro ao criar uma categoria duplicada', () => {
        return request(address)

        // Método POST //
        .post('/category')

        // Enviando o body //
        .send({ name: categoryName })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe('Categoria já existente')
        })
    });

})

describe('GET - Category', () => {

    test('Deve obter todas as categorias', () => {
        return request(address)

        // Método GET //
        .get('/category')

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)

            // Data //
            expect(response.body.data).toBeInstanceOf(Array);
        })
    });

})

describe('PUT - Category', () => {

    let categoryName = 'New Olá mundo!',
        newCategoryName = 'New Olá mundo 2!'

    test('Deve criar e atualizar uma categoria existente', () => {
        return request(address)

        // Método POST //
        .post('/category')

        // Enviando o body //
        .send({ name: categoryName })

        // Retornou com sucesso //
        .then(response =>
            request(address)

            // Método PUT //
            .put(`/category?id=${response.body.data._id}`)

            // Enviando o body //
            .send({ name: newCategoryName })

            // Retornou com sucesso //
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body.success).toBeDefined()
                expect(response.body.success).toBe(true)

                // Data //
                expect(response.body.data.name).toBe(newCategoryName)
                expect(response.body.data._id).toBeDefined()
                expect(response.body.data.createdAt).toBeDefined()
                expect(response.body.data.updatedAt).toBeDefined()
            })
        )
    })

    test('Deve atualizar uma categora inexistente', () => {
        return request(address)

        // Método PUT //
        .put(`/category?id=61f2b8597f9f120da893191d`)

        // Enviando o body //
        .send({ name: newCategoryName })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe('Categoria não foi encontrada na base de dados!')
        })
    });

})

describe('DELETE - Category', () => {

    let categoryName = 'New Olá mundo!';

    test('Deve deletar uma categoria', () => {
        return request(address)

        // Método POST //
        .post('/category')

        // Enviando o body //
        .send({ name: categoryName })

        // Retornou com sucesso //
        .then(response =>
            request(address)

            // Método PUT //
            .del(`/category/${response.body.data._id}`)

            // Retornou com sucesso //
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body.success).toBeDefined()
                expect(response.body.success).toBe(true)
                expect(response.body.message).toBe('Categoria e seus produtos deletados com sucesso.')
            })
        )
    })

    test('Deve deletar uma categoria inexistente', () => {
        return request(address)

        // Método PUT //
        .del(`/category/61f2b8597f9f120da893191d`)

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(400)
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe('Categoria não foi encontrada na base de dados!')
        })
    })

})
