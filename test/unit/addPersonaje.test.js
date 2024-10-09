const { addPersonaje } = require('../../src/functions/addPersonaje');
const { v4 } = require('uuid');
const { docClient, PutCommand } = require('../../src/database');

jest.mock('../../src/database', () => ({
    docClient: {
        send: jest.fn(),
    },
    PutCommand: jest.fn(),
}));

jest.mock('uuid', () => ({
    v4: jest.fn(() => '12345678-1234-1234-1234-123456789012'),
}));

describe('addPersonaje', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debería agregar un personaje correctamente', async () => {
        const event = {
            body: JSON.stringify({
                nombre: 'Goku',
                poder: '60.000.000',
                maxPoderKi: "90 Septillion",
                raza: 'Saiyajin',
                genero: 'Masculino',
            }),
        };

        const result = await addPersonaje(event);

        expect(result).toEqual({
            statusCode: 201,
            body: JSON.stringify({
                id: '12345678-1234-1234-1234-123456789012',
                nombre: 'Goku',
                poder: '60.000.000',
                maxPoderKi: "90 Septillion",
                raza: 'Saiyajin',
                genero: 'Masculino',
            }),
        });

        expect(docClient.send).toHaveBeenCalledTimes(1);
        expect(docClient.send).toHaveBeenCalledWith(expect.any(PutCommand));
    });

    it('Debería lanzar un error 400 si no se proporciona el cuerpo del evento', async () => {
        const event = {}

        const result = await addPersonaje(event);

        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ error: 'El cuerpo del evento es requerido' }),
        });
    })

    it('Debería lanzar un error 500 si la operación falla', async () => {
        docClient.send.mockRejectedValueOnce(new Error('Error en DynamoDB'));

        const event = {
            body: JSON.stringify({
                nombre: 'Goku',
                poder: '60.000.000',
                maxPoderKi: "90 Septillion",
                raza: 'Saiyajin',
                genero: 'Masculino',
            }),
        };

        const response = await addPersonaje(event);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ error: 'Error en DynamoDB' });
        expect(docClient.send).toHaveBeenCalledTimes(1);
        expect(docClient.send).toHaveBeenCalledWith(expect.any(PutCommand));
    })
});
