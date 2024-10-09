const { getPersonaje } = require('../../src/functions/getPersonaje');
const { docClient, ScanCommand } = require('../../src/database');


jest.mock('../../src/database', () => ({
    docClient: {
        send: jest.fn(),
    },
    ScanCommand: jest.fn(),
}));

describe('getPersonaje', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debería obtener todos los personajes exitosamente', async () => {
        const mockItems = [
            { id: '1', nombre: 'Goku', poder: 'Super Saiyan' },
            { id: '2', nombre: 'Vegeta', poder: 'Super Saiyan' }
        ]

        docClient.send.mockResolvedValueOnce({ Items: mockItems });

        const event = {}
        const response = await getPersonaje(event);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(mockItems);
        expect(docClient.send).toHaveBeenCalledTimes(1);
        expect(docClient.send).toHaveBeenCalledWith(expect.any(ScanCommand));
    })

    it('Debería lanzar un error 500 si la operación falla', async () => {
        docClient.send.mockRejectedValueOnce(new Error('Error en DynamoDB'));

        const event = {};
        const response = await getPersonaje(event);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ error: 'Error en DynamoDB' });
        expect(docClient.send).toHaveBeenCalledTimes(1);
        expect(docClient.send).toHaveBeenCalledWith(expect.any(ScanCommand));
    })
});
