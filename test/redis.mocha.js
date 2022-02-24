const chai = require('chai');
let should = chai.should();
const expect = chai.expect;

const redis = require('../services/redis/redis.js');

describe('Redis', () => {

    describe('Check', () => {
        it('Deve ter os métodos #start e #stop', (done) => {
            redis.should.have.property('start')
            redis.should.have.property('stop')

            done();
        });
    });

});
