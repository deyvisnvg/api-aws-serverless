const { speciesService } = require('../../services');
const { SWAPI_MAP_SPANISH_SPECIE } = require('../../core/swapiMap_es');

exports.getSwapiSpecies = async (event) => {
    try {
        const { data: species } = await speciesService.getAll();

        const speciesMapSpanish = species.results.map(specie => {
            const specieMap = {}

            Object.keys(specie).forEach(key => {
                specieMap[SWAPI_MAP_SPANISH_SPECIE[key]] = specie[key];
            })

            return specieMap;
        })

        return {
            statusCode: 200,
            body: JSON.stringify(speciesMapSpanish),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }
};
