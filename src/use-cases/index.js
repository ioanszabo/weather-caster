const { loadLastConfig } = require('../config/config');
const { createRequest } = require('../entity');
const { transformToRequestEntity } = require('../entity/options');
const { makeGetWeatherByCity } = require('./get-weather-by-city');
const { fetchWeatherByCityName, fetchWeatherByZipCode } = require('../data-access');
const { makeGetWeatherByZipCode } = require('./get-weather-by-zip-code');

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const getWeatherByCity = makeGetWeatherByCity(fetchWeatherByCityName, createRequest, transformToRequestEntity);
const getWeatherByZipCode = makeGetWeatherByZipCode(fetchWeatherByZipCode, createRequest, transformToRequestEntity);
const router = (args) => {
    if (hasOwnProperty(args, 'c') && hasOwnProperty(args, 't')) {
        return getWeatherByCity;
    }
    if (hasOwnProperty(args, 'z') && hasOwnProperty(args, 't')) {
        return getWeatherByZipCode;
    }
    if (hasOwnProperty(args, 'l')) {
        return getLastWeatherSearch;
    }
};

const getLastWeatherSearch = (cliArguments, location) => {
    const cliArgumentsFromFile = loadLastConfig(location);
    const useCase = useCaseFactory(cliArguments);
    return new Promise((resolve) => {
        resolve({ getData: () => 'Testing' });
    });
};

exports.useCaseFactory = (args) => {
    return router(args);
};
