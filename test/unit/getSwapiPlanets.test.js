const { getSwapiPlanets } = require('../../src/functions/getSwapiPlanets');
const { planetService } = require('../../src/services');
const { SWAPI_MAP_SPANISH_PLANET } = require('../../src/core/swapiMap_es');

jest.mock('../../src/services', () => ({
    planetService: {
        getAll: jest.fn(),
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

describe('getSwapiPlanets', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debería obtener todos los planetas y mapear los atributos al español exitosamente', async () => {
        const mockPlanets = {
            results: [
                {
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
                },
                {
                    name: "Yavin IV",
                    rotation_period: "24",
                    orbital_period: "4818",
                    diameter: "10200",
                    climate: "temperate, tropical",
                    gravity: "1 standard",
                    terrain: "jungle, rainforests",
                    surface_water: "8",
                    population: "1000",
                    residents: [],
                    films: [
                        "https://swapi.py4e.com/api/films/1/"
                    ],
                    created: "2014-12-10T11:37:19.144000Z",
                    edited: "2014-12-20T20:58:18.421000Z",
                    url: "https://swapi.py4e.com/api/planets/3/"
                }
            ]
        }

        planetService.getAll.mockResolvedValueOnce({ data: mockPlanets });

        const event = {};
        const response = await getSwapiPlanets(event);

        const planetsMapSpanish = mockPlanets.results.map(planet => {
            const planetMap = {}

            Object.keys(planet).forEach(key => {
                planetMap[SWAPI_MAP_SPANISH_PLANET[key]] = planet[key];
            })

            return planetMap;
        })

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(planetsMapSpanish);
        expect(planetService.getAll).toHaveBeenCalledTimes(1);
    })

    it('Debería lanzar un error 500 si la operación falla', async () => {
        planetService.getAll.mockRejectedValueOnce(new Error('Error en api Swapi service planets'));

        const event = {};
        const response = await getSwapiPlanets(event);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ error: 'Error en api Swapi service planets' });
        expect(planetService.getAll).toHaveBeenCalledTimes(1);
    })
});
