const prompt = require('prompt-sync')();
const { fileHelper } = require('../helper');

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const showPrompt = () => {
    const t = prompt('For Fahrenheit enter f, for Celsius enter c\n>');
    if (['c', 'f'].indexOf(t) === -1) {
        showPrompt();
    } else {
        return t;
    }
};

const router = (args, weatherControllers) => {
    if (hasOwnProperty(args, 'c') && hasOwnProperty(args, 't')) {
        return [weatherControllers.getWeatherByCityController, args];
    }
    if (hasOwnProperty(args, 'c')) {
        args.t = showPrompt();
        return [weatherControllers.getWeatherByCityController, args];
    }
    if (hasOwnProperty(args, 'z') && hasOwnProperty(args, 't')) {
        return [weatherControllers.getWeatherByZipCodeController, args];
    }
    if (hasOwnProperty(args, 'z')) {
        args.t = showPrompt();
        return [weatherControllers.getWeatherByZipCodeController, args];
    }
};

exports.fetchController = (weatherControllers) => (args) => {
    const useCase = router(args, weatherControllers);
    if (useCase) {
        return useCase;
    }
    if (hasOwnProperty(args, 'import')) {
        return [weatherControllers.getWeatherForMultipleCitiesController, args];
    }
    if (hasOwnProperty(args, 'l')) {
        const cliArgumentsFromFile = fileHelper.loadLastConfig();
        return router(cliArgumentsFromFile, weatherControllers);
    }
};
