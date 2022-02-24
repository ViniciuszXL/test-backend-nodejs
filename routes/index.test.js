const request = require('supertest');

let address = global.address;

describe('GET - Index', () => {

    test('Deve obter as informações', () => {
        return request(address)

        // Método GET //
        .get('/')

        // Requisição feita com sucesso //
        .then(response => {
            expect(response.statusCode).toBe(200);

            // Body //
            expect(response.body.success).toBeDefined()
            expect(response.body.success).toBe(true)

            expect(response.body.version).toBeDefined();
            expect(response.body.description).toBeDefined();
            expect(response.body.routes).toBeInstanceOf(Object)
        });
    });

});
