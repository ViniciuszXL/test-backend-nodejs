const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

const expect = chai.expect;
let address = process.env.URL || "http://127.0.0.1:4444",
        categoryId, productId,
        categoryName = 'Product Category Test.',
        title = 'Product Title Test.',
        newTitle = 'Product Title Test 2.',
        description = 'Product Description Test',
        newDescription = 'Product Description Test 2',
        price = 3100,
        newPrice = 3600;

describe('Product', () => {

    describe('POST', () => {

        it('Deve criar uma nova categoria e posteriormente um novo produto', (done) => {
            chai.request(address)
            // POST //
            .post('/category')
            // Body //
            .send({ name: categoryName })
            // End //
            .end((err, response) => {
                categoryId = response.body.data._id

                chai.request(address)
                // POST //
                .post('/product')
                // Body //
                .send({ title: title, description: description, price: price, categoryId: categoryId })
                // End //
                .end((err, response) => {
                    response.should.have.status(200)

                    response.body.should.have.property('success')
                    response.body.should.have.property('success').eql(true)

                    response.body.data.title.should.to.be.equals(title)
                    response.body.data.description.should.to.be.equals(description)
                    response.body.data.price.should.to.be.equals(price)
                    response.body.data.categoryId.should.to.be.equals(categoryId)

                    productId = response.body.data._id

                    done();
                });
            })
        })

        it('Deve dar erro ao criar um produto duplicado', (done) => {
            chai.request(address)
            // POST //
            .post('/product')
            // Body //
            .send({ title: title, description: description, price: price, categoryId: categoryId })
            // End //
            .end((err, response) => {
                response.should.have.status(400)

                response.body.should.have.property('success')
                response.body.should.have.property('success').eql(false)

                response.body.message.should.to.be.equals('Produto já cadastrado nessa categoria!')

                done();
            });
        })

    });

    describe('GET', () => {

        it('Deve obter todos os produtos', (done) => {
            chai.request(address)
            // GET //
            .get('/product')
            // End //
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').eql(true)

                response.body.data.should.to.be.instanceOf(Object)

                done();
            });
        })

        it('Deve obter o produto pelo título', (done) => {
            chai.request(address)
            // GET //
            .get('/product')
            // Query //
            .query({ title: title })
            // End //
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').eql(true)

                response.body.data.should.to.be.instanceOf(Object)

                done();
            });
        })

        it('Deve obter o produto pela descrição', (done) => {
            chai.request(address)
            // GET //
            .get('/product')
            // Query //
            .query({ description: description })
            // End //
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').eql(true)

                response.body.data.should.to.be.instanceOf(Object)

                done();
            });
        })

        it('Deve obter o produto pelo título e descrição', (done) => {
            chai.request(address)
            // GET //
            .get('/product')
            // Query //
            .query({ title: title, description: description })
            // End //
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').eql(true)

                response.body.data.should.to.be.instanceOf(Object)

                done();
            });
        })

    });

    describe('PUT', () => {

        it('Deve atualizar um produto existente', (done) => {
            chai.request(address)
            // PUT //
            .put(`/product`)
            // Query //
            .query({ id: productId })
            // Body //
            .send({ title: newTitle, description: newDescription, price: newPrice })
            // End //
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').equals(true)

                response.body.data.title.should.to.be.equals(newTitle)
                response.body.data.description.should.to.be.equals(newDescription)
                response.body.data.price.should.to.be.equals(newPrice)

                done()
            });
        });

        it ('Deve tentar atualizar um produto inexistente', (done) => {
            chai.request(address)
            // PUT //
            .put(`/product`)
            // Query //
            .query({ id: '61f2b8597f9f120da893191d' })
            // Body //
            .send({ title: newTitle, description: newDescription, price: newPrice })
            // End //
            .end((err, response) => {
                response.should.have.status(400)

                response.body.should.have.property('success')
                response.body.should.have.property('success').equals(false)

                response.body.message.should.to.be.equals('Esse produto não existe!')

                done();
            })
        })

    });

    describe('DELETE', () => {

        it('Deve deletar o produto criado', (done) => {
            chai.request(address)
            // DEL //
            .del(`/product/${productId}`)
            // End //
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').equals(true)

                response.body.message.should.to.be.equals('Produto deletado com sucesso.')

                done();
            });
        })

        it('Deve dar erro ao deletar um produto inexistente', (done) => {
            chai.request(address)
            // DEL //
            .del(`/product/61f2b8597f9f120da893191d`)
            // End //
            .end((err, response) => {
                response.should.have.status(400)

                response.body.should.have.property('success')
                response.body.should.have.property('success').equals(false)

                response.body.message.should.to.be.equals('Esse produto não foi encontrado no banco de dados.')

                done();
            });
        })

        it('Deve deletar a categoria criada', (done) => {
            chai.request(address)
            // DEL //
            .del(`/category/${categoryId}`)
            // End //
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').equals(true)

                response.body.message.should.to.be.equals('Categoria e seus produtos deletados com sucesso.')

                done();
            });
        })

    });

})
