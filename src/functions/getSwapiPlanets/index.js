const { planetService } = require('../../services');
const { SWAPI_MAP_SPANISH_PLANET } = require('../../core/swapiMap_es');

exports.getSwapiPlanets = async (event) => {
    try {
        const { data: planets } = await planetService.getAll();

        const planetsMapSpanish = planets.results.map(planet => {
            const planetMap = {}

            Object.keys(planet).forEach(key => {
                planetMap[SWAPI_MAP_SPANISH_PLANET[key]] = planet[key];
            })

            return planetMap;
        })

        return {
            statusCode: 200,
            body: JSON.stringify(planetsMapSpanish),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        }
    }
};
