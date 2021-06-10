const prompt = require('prompt-sync')();
const { fileHelper, objectHelper } = require('../helper');

const showUnitOfTemperaturePrompt = () => {
    const t = prompt('For Fahrenheit enter f, for Celsius enter c> ');
    if (['c', 'f'].indexOf(t) === -1) {
        showUnitOfTemperaturePrompt();
    } else {
        return t;
    }
};

const showCityPrompt = () => {
    return prompt('Enter the city name> ');
};

const router = (args, weatherControllers) => {
    if (Object.keys(args).length === 0) {
        args.c = showCityPrompt();
        args.t = showUnitOfTemperaturePrompt();
        return [weatherControllers.getWeatherByCityController, args];
    }
    if (objectHelper.checkIfHasProperty(args, 'c') && objectHelper.checkIfHasProperty(args, 't')) {
        return [weatherControllers.getWeatherByCityController, args];
    }
    if (objectHelper.checkIfHasProperty(args, 'c')) {
        args.t = showUnitOfTemperaturePrompt();
        return [weatherControllers.getWeatherByCityController, args];
    }
    if (objectHelper.checkIfHasProperty(args, 'z') && objectHelper.checkIfHasProperty(args, 't')) {
        return [weatherControllers.getWeatherByZipCodeController, args];
    }
    if (objectHelper.checkIfHasProperty(args, 'z')) {
        args.t = showUnitOfTemperaturePrompt();
        return [weatherControllers.getWeatherByZipCodeController, args];
    }
};

exports.fetchController = (weatherControllers) => (args) => {
    const useCase = router(args, weatherControllers);
    if (useCase) {
        return useCase;
    }
    if (objectHelper.checkIfHasProperty(args, 'import')) {
        return [weatherControllers.getWeatherForMultipleCitiesController, args];
    }
    if (objectHelper.checkIfHasProperty(args, 'l')) {
        const cliArgumentsFromFile = fileHelper.loadLastConfig();
        return router(cliArgumentsFromFile, weatherControllers);
    }
};
