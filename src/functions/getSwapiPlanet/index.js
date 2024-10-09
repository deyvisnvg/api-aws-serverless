const { planetService } = require('../../services');
const { SWAPI_MAP_SPANISH_PLANET } = require('../../core/swapiMap_es');

exports.getSwapiPlanet = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'El parámetro id es requerido' }),
    };
  }

  const { id } = event.pathParameters;

  try {
    const { data: planet } = await planetService.getById(id);
    const planetMapSpanish = {}

    Object.keys(planet).forEach(key => {
      planetMapSpanish[SWAPI_MAP_SPANISH_PLANET[key]] = planet[key];
    })

    return {
      statusCode: 200,
      body: JSON.stringify(planetMapSpanish),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
};
