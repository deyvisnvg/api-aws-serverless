const { instance } = require("./swapiService");

const endPointPlanets = "planets/";
const endPointSpecies = "species/";

const planetService = {
    getAll: async () => {
        return await instance.get(endPointPlanets)
    },
    getById: async (id) => {
        return await instance.get(`${endPointPlanets}/${id}`)
    }
}

const speciesService = {
    getAll: async () => {
        return await instance.get(endPointSpecies)
    },
    getById: async (id) => {
        return await instance.get(`${endPointSpecies}/${id}`)
    }
}

module.exports = {
    planetService,
    speciesService
}