const prompt = require('prompt-sync')();
const publicIp = require('public-ip');
const fetch = require('node-fetch');
const { fileHelper } = require('../helper');

const showUnitOfTemperaturePrompt = (message = 'For Fahrenheit enter f, for Celsius enter c> ') => {
    const t = prompt(message);
    if (['c', 'f'].indexOf(t) === -1) {
        return showUnitOfTemperaturePrompt('Enter a valid option - `c` or `f`');
    }
    return t;

};

const showCityPrompt = (message = 'Enter city name> ') => {
    const input = prompt(message);
    if (!input.trim()) {
        return showCityPrompt('Enter a valid city name> ');
    }
    return input;
};

const showCityPromptGeoLocation = (city) => {
    const input = prompt(`Which location? ${city}> `);
    if (!input) {
        return city;
    }
    return input;
};

const makeResponse = (response) => {
    return new Promise((resolve) => resolve(response));
};

const makeHasArgumentsCli = (cliArguments) => (keys) => {
    const cliArgumentsKeys = Object.keys(cliArguments);
    return keys.every((key) => cliArgumentsKeys.indexOf(key) > -1);
};

const router = async (args, weatherControllers, getHelp, hasArgumentsCli) => {
    if (Object.keys(args).length === 0) {
        const ip = await publicIp.v4();
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const locationDetails = await response.json();
        args.c = showCityPromptGeoLocation(locationDetails.city);
        args.t = showUnitOfTemperaturePrompt();
        return makeResponse([weatherControllers.getWeatherByCityController, args]);
    }
    if (hasArgumentsCli(['nogeolocation'])) {
        const args = {};
        args.c = showCityPrompt();
        args.t = showUnitOfTemperaturePrompt();
        return makeResponse([weatherControllers.getWeatherByCityController, args]);
    }
    if (hasArgumentsCli(['c', 't'])) {
        return makeResponse([weatherControllers.getWeatherByCityController, args]);
    }
    if (hasArgumentsCli(['z', 't'])) {
        return makeResponse([weatherControllers.getWeatherByZipCodeController, args]);
    }
    if (hasArgumentsCli(['t'])) {
        args.c = showCityPrompt();
        return makeResponse([weatherControllers.getWeatherByCityController, args]);
    }
    if (hasArgumentsCli(['c'])) {
        args.t = showUnitOfTemperaturePrompt();
        return makeResponse([weatherControllers.getWeatherByCityController, args]);
    }
    if (hasArgumentsCli(['z'])) {
        args.t = showUnitOfTemperaturePrompt();
        return makeResponse([weatherControllers.getWeatherByZipCodeController, args]);
    }
    if (hasArgumentsCli(['h'])) {
        return makeResponse([getHelp, args]);
    }
};

exports.fetchController = (weatherControllers, getHelp) => async (args) => {
    const hasArgumentsCli = makeHasArgumentsCli(args);
    const useCase = await router(args, weatherControllers, getHelp, hasArgumentsCli);
    if (useCase) {
        return makeResponse(useCase);
    }
    if (hasArgumentsCli(['import'])) {
        return makeResponse([weatherControllers.getWeatherForMultipleCitiesController, args]);
    }
    if (hasArgumentsCli(['l'])) {
        const cliArgumentsFromFile = fileHelper.loadLastConfig();
        const hasArgumentsCli = makeHasArgumentsCli(cliArgumentsFromFile);
        return router(cliArgumentsFromFile, weatherControllers, getHelp, hasArgumentsCli);
    }
};
