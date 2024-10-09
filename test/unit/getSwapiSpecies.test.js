const { getSwapiSpecies } = require('../../src/functions/getSwapiSpecies');
const { speciesService } = require('../../src/services');
const { SWAPI_MAP_SPANISH_SPECIE } = require('../../src/core/swapiMap_es');

jest.mock('../../src/services', () => ({
    speciesService: {
        getAll: jest.fn(),
    },
}));

jest.mock('../../src/core/swapiMap_es', () => ({
    SWAPI_MAP_SPANISH_SPECIE: {
        name: "nombre",
        classification: "clasificacion",
        designation: "designacion",
        average_height: "altura_promedio",
        skin_colors: "colores_de_piel",
        hair_colors: "colores_de_cabello",
        eye_colors: "colores_de_ojos",
        average_lifespan: "promedio_de_vida",
        homeworld: "mundo_origen",
        language: "idioma",
        people: "personas",
        films: "peliculas",
        created: "creado",
        edited: "editado",
        url: "url"
    }
}));

describe('getSwapiSpecies', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debería obtener todas las species y mapear los atributos al español exitosamente', async () => {
        const mockSpecies = {
            results: [
                {
                    name: "Hutt",
                    classification: "gastropod",
                    designation: "sentient",
                    average_height: "300",
                    skin_colors: "green, brown, tan",
                    hair_colors: "n/a",
                    eye_colors: "yellow, red",
                    average_lifespan: "1000",
                    homeworld: "https://swapi.py4e.com/api/planets/24/",
                    language: "Huttese",
                    people: [
                        "https://swapi.py4e.com/api/people/16/"
                    ],
                    films: [
                        "https://swapi.py4e.com/api/films/1/"
                    ],
                    created: "2014-12-10T17:12:50.410000Z",
                    edited: "2014-12-20T21:36:42.146000Z",
                    url: "https://swapi.py4e.com/api/species/5/"
                },
                {
                    name: "Droid",
                    classification: "artificial",
                    designation: "sentient",
                    average_height: "n/a",
                    skin_colors: "n/a",
                    hair_colors: "n/a",
                    eye_colors: "n/a",
                    average_lifespan: "indefinite",
                    homeworld: null,
                    language: "n/a",
                    people: [
                        "https://swapi.py4e.com/api/people/2/"
                    ],
                    films: [
                        "https://swapi.py4e.com/api/films/1/"
                    ],
                    created: "2014-12-10T15:16:16.259000Z",
                    edited: "2014-12-20T21:36:42.139000Z",
                    url: "https://swapi.py4e.com/api/species/2/"
                }
            ]
        }

        speciesService.getAll.mockResolvedValueOnce({ data: mockSpecies });

        const event = {};
        const response = await getSwapiSpecies(event);

        const speciesMapSpanish = mockSpecies.results.map(specie => {
            const specieMap = {}

            Object.keys(specie).forEach(key => {
                specieMap[SWAPI_MAP_SPANISH_SPECIE[key]] = specie[key];
            })

            return specieMap;
        })

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(speciesMapSpanish);
        expect(speciesService.getAll).toHaveBeenCalledTimes(1);
    })

    it('Debería lanzar un error 500 si la operación falla species', async () => {
        speciesService.getAll.mockRejectedValueOnce(new Error('Error en api Swapi service species'));

        const event = {};
        const response = await getSwapiSpecies(event);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ error: 'Error en api Swapi service species' });
        expect(speciesService.getAll).toHaveBeenCalledTimes(1);
    })
});
