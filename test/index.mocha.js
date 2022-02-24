const chai = require('chai');
const chaiHttp = require('chai-http')
let should = chai.should();

chai.use(chaiHttp);

const expect = chai.expect;
let address = process.env.URL || "http://127.0.0.1:4444";

describe('Index', () => {

    describe('GET - Index', () => {

        it('Deve obter as informações', (done) => {
            chai.request(address)
            // Método GET //
            .get('/')
            // Requisição feita com sucesso //
            .end((err, response) => {
                response.should.have.status(200)

                // Body //
                response.body.should.have.property('success')
                response.body.should.have.property('success').eql(true)

                response.body.should.have.property('version')
                response.body.should.have.property('description')
                response.body.routes.should.to.be.instanceOf(Object)

                done();
            });
        });

    });

});
