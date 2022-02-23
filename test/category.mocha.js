const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
let should = chai.should();

chai.use(chaiHttp);

const expect = chai.expect;
let address = process.env.URL || "http://127.0.0.1:4444";

describe('Category', () => {

    let categoryName = 'Mundo teste. Talvez funcione!';
    let categoryId;

    describe('POST', () => {

        it('Deve criar uma categoria', (done) => {
            chai.request(address)
            // POST
            .post('/category')
            // Body
            .send({ name: categoryName })
            // End
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').eql(true)

                // Data //
                response.body.data.name.should.to.be.equals(categoryName)
                response.body.data.should.have.property('_id')
                response.body.data.should.have.property('createdAt')
                response.body.data.should.have.property('updatedAt')

                categoryId = response.body.data._id
                done();
            })
        });

        it('Deve dar erro ao criar uma categoria duplicada', (done) => {
            chai.request(address)
            // POST
            .post('/category')
            // Body
            .send({ name: categoryName })
            // End
            .end((err, response) => {
                response.should.have.status(400)

                response.body.should.have.property('success')
                response.body.should.have.property('success').equals(false)

                // Data //
                response.body.message.should.to.be.equals('Categoria já existente')

                done();
            })
        });
    });

    describe('GET', () => {

        it('Deve obter todas as categorias', (done) => {
            chai.request(address)
            // GET //
            .get('/category')
            // End //
            .end((err, response) => {
                response.should.have.status(200)

                response.body.should.have.property('success')
                response.body.should.have.property('success').equals(true)

                response.body.data.should.to.be.instanceOf(Object)

                done();
            });
        })

    })

    describe('DELETE', () => {

        it('Deve deletar uma categoria', (done) => {
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

        it('Deve dar erro ao deletar uma categoria inexistente', (done) => {
            chai.request(address)
            // DEL //
            .del(`/category/${categoryId}`)
            // End //
            .end((err, response) => {
                response.should.have.status(400)

                response.body.should.have.property('success')
                response.body.should.have.property('success').equals(false)

                response.body.message.should.to.be.equals('Categoria não foi encontrada na base de dados!')

                done();
            });
        })

    });

});
