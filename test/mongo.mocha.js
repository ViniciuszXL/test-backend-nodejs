const chai = require('chai');
let should = chai.should();
const expect = chai.expect;

const mongo = require('../services/mongo/mongo.js');

describe('Mongo', () => {

    describe('Check', () => {
        it('Deve ter os métodos #start e #stop', (done) => {
            mongo.should.have.property('start')
            mongo.should.have.property('stop')

            done();
        });
    });

    describe('Start', () => {
        it('Deve inicializar a conexão com o Mongo', (done) => {
            mongo.start({
                isTest: true,
                database: 'testes'
            })

            .then(connection => {
                connection.should.not.throw();
                done();
            })

            .catch(console.log);
        });
    });

    describe('End', () => {
        it('Deve finalizar a conexão com o Mongo', (done) => {
            expect(() => {
                mongo.stop();
                done();
            }).not.throw();
        });
    });

});
