const { getSwapiSpecie } = require('../../src/functions/getSwapiSpecie');
const { speciesService } = require('../../src/services');
const { SWAPI_MAP_SPANISH_SPECIE } = require('../../src/core/swapiMap_es');

jest.mock('../../src/services', () => ({
    speciesService: {
        getById: jest.fn(),
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

describe('getSwapiSpecie', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debería lanzar un error 400 si pathParameters no está presente - specie', async () => {
        const event = {};
        const response = await getSwapiSpecie(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ error: 'El parámetro id es requerido' });
        expect(speciesService.getById).not.toHaveBeenCalled();
    });

    it('Debería obtener una specie y mapear los atributos al español exitosamente', async () => {
        const mockSpecie = {
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
        }

        speciesService.getById.mockResolvedValueOnce({ data: mockSpecie });

        const event = {
            pathParameters: {
                id: '2'
            }
        }
        const response = await getSwapiSpecie(event);
        const specieMapSpanish = {}

        Object.keys(mockSpecie).forEach(key => {
            specieMapSpanish[SWAPI_MAP_SPANISH_SPECIE[key]] = mockSpecie[key];
        })

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(specieMapSpanish);
        expect(speciesService.getById).toHaveBeenCalledTimes(1);
        expect(speciesService.getById).toHaveBeenCalledWith('2');
    })

    it('Debería lanzar un error 500 si la operación falla', async () => {
        speciesService.getById.mockRejectedValueOnce(new Error('Error en api Swapi service specie'));

        const event = {
            pathParameters: {
                id: '2'
            }
        }
        const response = await getSwapiSpecie(event);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ error: 'Error en api Swapi service specie' });
        expect(speciesService.getById).toHaveBeenCalledTimes(1);
        expect(speciesService.getById).toHaveBeenCalledWith('2');
    })
});
