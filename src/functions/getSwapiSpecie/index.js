const { speciesService } = require('../../services');
const { SWAPI_MAP_SPANISH_SPECIES } = require('../../core/swapiMap_es');

exports.getSwapiSpecie = async (event) => {
  const { id } = event.pathParameters;

  try {
    const { data: specie } = await speciesService.getById(id);
    const specieMapSpanish = {}

    Object.keys(specie).forEach(key => {
        specieMapSpanish[SWAPI_MAP_SPANISH_SPECIES[key]] = specie[key];
    })

    return {
      statusCode: 200,
      body: JSON.stringify(specieMapSpanish),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
};
