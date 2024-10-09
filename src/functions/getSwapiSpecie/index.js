const { speciesService } = require('../../services');
const { SWAPI_MAP_SPANISH_SPECIE } = require('../../core/swapiMap_es');

exports.getSwapiSpecie = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'El parámetro id es requerido' }),
    };
  }

  const { id } = event.pathParameters;

  try {
    const { data: specie } = await speciesService.getById(id);
    const specieMapSpanish = {}

    Object.keys(specie).forEach(key => {
        specieMapSpanish[SWAPI_MAP_SPANISH_SPECIE[key]] = specie[key];
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
