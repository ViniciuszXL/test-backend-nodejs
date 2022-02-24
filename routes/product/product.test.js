const request = require('supertest');

// Local and global variables //
let address = global.address,
            categoryId, productId,
            categoryName = 'Olá mundo category',
            title = 'Olá mundo!',
            newTitle = 'Olá mundo 2!',
            description = 'Olá mundo. Este é um produto Seara',
            newDescription = 'Olá mundo. Este é um produto Nestlé',
            price = 3000,
            newPrice = 3500;

describe('POST - Product', () => {

    test('Deve criar um produto', () => {
        return request(address)

        // Método POST //
        .post('/category')

        // Enviando o body //
        .send({ name: categoryName })

        // Retornou com sucesso //
        .then(response => {
            categoryId = response.body.data._id
            return request(address)

                // Método POST //
                .post('/product')

                // Enviando o body //
                .send({ title: title, description: description, price: price, categoryId: categoryId })

                // Retornou com sucesso //
                .then(response => {
                    expect(response.statusCode).toBe(200)

                    // Body //
                    expect(response.body.success).toBeDefined()
                    expect(response.body.success).toBe(true)

                    // Data //
                    expect(response.body.data.title).toBe(title)
                    expect(response.body.data.description).toBe(description)
                    expect(response.body.data.price).toBe(price)
                    expect(response.body.data.categoryId).toBe(categoryId)

                    productId = response.body.data._id
                })
        })
    });

    test('Deve dar erro ao criar um produto duplicado', () => {
        return request(address)

        // Método POST //
        .post('/product')

        // Enviando o Body //
        .send({ title: title, description: description, price: price, categoryId: categoryId })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(400)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe('Produto já cadastrado nessa categoria!')
        })
    });

})


describe('GET - Product', () => {

    test('Deve tentar obter todos os produtos', () => {
        return request(address)

        // Método GET //
        .get('/product')

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)

            // Data //
            expect(response.body.data).toBeInstanceOf(Array);
        })
    });

    test('Deve tentar obter o produto pelo titulo', () => {
        return request(address)

        // Método GET //
        .get('/product')

        // Query //
        .query({ title: title })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)

            // Data //
            expect(response.body.data).toBeInstanceOf(Array);
        })
    });

    test('Deve tentar obter o produto pela descrição', () => {
        return request(address)

        // Método GET //
        .get('/product')

        // Query //
        .query({ description: description })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)

            // Data //
            expect(response.body.data).toBeInstanceOf(Array);
        })
    });

    test('Deve tentar obter o produto pelo título e descrição', () => {
        return request(address)

        // Método GET //
        .get('/product')

        // Query //
        .query({ title: title, description: description })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)

            // Data //
            expect(response.body.data).toBeInstanceOf(Array);
        })
    });

})

describe('PUT - Product', () => {

    test('Deve tentar atualizar um produto existente', () => {
        return request(address)

        // Método PUT //
        .put(`/product`)

        // Query //
        .query({ id: productId })

        // Enviando o body //
        .send({ title: newTitle, description: newDescription, price: newPrice })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)

            // Data //
            expect(response.body.data.title).toBe(newTitle)
            expect(response.body.data.description).toBe(newDescription)
            expect(response.body.data.price).toBe(newPrice)
        })
    })

    test('Deve tentar atualizar um produto inexistente', () => {
        return request(address)

        // Método PUT //
        .put(`/product`)

        // Query //
        .query({ id: '61f2b8597f9f120da893191d' })

        // Enviando o body //
        .send({ title: newTitle, description: newDescription, price: newPrice })

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(400)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe('Esse produto não existe!')
        })
    });

})

describe('DELETE - Product', () => {

    test('Deve tentar deletar um produto', () => {
        return request(address)

        // Método DEL //
        .del(`/product/${productId}`)

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)
            expect(response.body.message).toBe('Produto deletado com sucesso.')
        })
    })

    test('Deve tentar deletar um produto inexistente', () => {
        return request(address)

        // Método DEL //
        .del(`/product/61f2b8597f9f120da893191d`)

        // Retornou com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(400)

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe('Esse produto não foi encontrado no banco de dados.')
        })
    })

})
