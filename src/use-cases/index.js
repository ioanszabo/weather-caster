const prompt = require('prompt-sync')();
const { readCities } = require('../config');
const { makeGetWeatherForMultipleCities } = require('./get-weather-for-multiple-cities');
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
    saveLastConfig
);
const getWeatherForMultipleCities = makeGetWeatherForMultipleCities(
    readCities,
    fetchWeatherByCityName,
    transformToRequestEntity
);

const showPrompt = () => {
    const t = prompt('For Fahrenheit enter f, for Celsius enter c\n>');
    if (['c', 'f'].indexOf(t) === -1) {
        showPrompt();
    } else {
        return t;
    }
};

const router = (args) => {
    if (hasOwnProperty(args, 'c') && hasOwnProperty(args, 't')) {
        return [getWeatherByCity, args];
    }
    if (hasOwnProperty(args, 'c')) {
        args.t = showPrompt();
        return [getWeatherByCity, args];
    }
    if (hasOwnProperty(args, 'z') && hasOwnProperty(args, 't')) {
        return [getWeatherByZipCode, args];
    }
    if (hasOwnProperty(args, 'z')) {
        args.t = showPrompt();
        return [getWeatherByZipCode, args];
    }
};

const useCaseFactory = (args) => {
    const useCase = router(args);
    if (useCase) {
        return useCase;
    }
    if (hasOwnProperty(args, 'import')) {
        return [getWeatherForMultipleCities, args];
    }
    if (hasOwnProperty(args, 'l')) {
        const cliArgumentsFromFile = loadLastConfig();
        return router(cliArgumentsFromFile);
    }
};

exports.useCaseFactory = useCaseFactory;
