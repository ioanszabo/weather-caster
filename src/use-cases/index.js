const prompt = require('prompt-sync')();
const { loadLastConfig } = require('../config');
const { saveLastConfig } = require('../config');
const { transformToRequestEntity } = require('../entity/options');
const { makeGetWeatherByCity } = require('./get-weather-by-city');
const { fetchWeatherByCityName, fetchWeatherByZipCode } = require('../data-access');
const { makeGetWeatherByZipCode } = require('./get-weather-by-zip-code');

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const getWeatherByCity = makeGetWeatherByCity(
    fetchWeatherByCityName,
    transformToRequestEntity,
    saveLastConfig
);
const getWeatherByZipCode = makeGetWeatherByZipCode(
    fetchWeatherByZipCode,
    transformToRequestEntity,
    saveLastConfig);

const router = (args) => {
    if (hasOwnProperty(args, 'c') && hasOwnProperty(args, 't')) {
        return [getWeatherByCity, args];
    }
    if (hasOwnProperty(args, 'c')) {
        args.t = prompt('How many more times? ');
        return [getWeatherByCity, args];
    }
    if (hasOwnProperty(args, 'z') && hasOwnProperty(args, 't')) {
        return [getWeatherByZipCode, args];
    }
};

const useCaseFactory = (args) => {
    const useCase = router(args);
    if (useCase) {
        return useCase;
    }
    if (hasOwnProperty(args, 'l')) {
        const cliArgumentsFromFile = loadLastConfig();
        return router(cliArgumentsFromFile);
    }
};

exports.useCaseFactory = useCaseFactory;
