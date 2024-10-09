const axios = require("axios");

exports.instance = axios.create({
    baseURL: 'https://swapi.py4e.com/api/',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});