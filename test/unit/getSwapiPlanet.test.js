const { getSwapiPlanet } = require('../../src/functions/getSwapiPlanet');
const { planetService } = require('../../src/services');
const { SWAPI_MAP_SPANISH_PLANET } = require('../../src/core/swapiMap_es');

jest.mock('../../src/services', () => ({
    planetService: {
        getById: jest.fn(),
    },
}));

jest.mock('../../src/core/swapiMap_es', () => ({
    SWAPI_MAP_SPANISH_PLANET: {
        name: "nombre",
        rotation_period: "periodo_de_rotacion",
        orbital_period: "periodo_orbital",
        diameter: "diametro",
        climate: "clima",
        gravity: "gravedad",
        terrain: "terreno",
        surface_water: "superficie_agua",
        population: "poblacion",
        residents: "residentes",
        films: "peliculas",
        created: "creado",
        edited: "editado",
        url: "url"
    }
}));

describe('getSwapiPlanet', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debería lanzar un error 400 si pathParameters no está presente - planet', async () => {
        const event = {};
        const response = await getSwapiPlanet(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ error: 'El parámetro id es requerido' });
        expect(planetService.getById).not.toHaveBeenCalled();
    });

    it('Debería obtener un planeta y mapear los atributos al español exitosamente', async () => {
        const mockPlanet = {
            name: "Tatooine",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
                "https://swapi.py4e.com/api/people/1/"
            ],
            films: [
                "https://swapi.py4e.com/api/films/1/"
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "https://swapi.py4e.com/api/planets/1/"
        }

        planetService.getById.mockResolvedValueOnce({ data: mockPlanet });

        const event = {
            pathParameters: {
                id: '1'
            }
        };
        const response = await getSwapiPlanet(event);
        const planetMapSpanish = {}

        Object.keys(mockPlanet).forEach(key => {
            planetMapSpanish[SWAPI_MAP_SPANISH_PLANET[key]] = mockPlanet[key];
        })

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(planetMapSpanish);
        expect(planetService.getById).toHaveBeenCalledTimes(1);
        expect(planetService.getById).toHaveBeenCalledWith('1');
    })

    it('Debería lanzar un error 500 si la operación falla', async () => {
        planetService.getById.mockRejectedValueOnce(new Error('Error en api Swapi service planet'));

        const event = {
            pathParameters: {
                id: '1'
            }
        };
        const response = await getSwapiPlanet(event);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ error: 'Error en api Swapi service planet' });
        expect(planetService.getById).toHaveBeenCalledTimes(1);
        expect(planetService.getById).toHaveBeenCalledWith('1');
    })
});
