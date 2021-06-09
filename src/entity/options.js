const R = require('ramda');
const { UNITS_CELSIUS, UNITS_FAHRENHEIT } = require('./request');

exports.transformToRequestEntity = (options) => {
    return {
        place: options && options.c ? options.c : (options.z ? options.z : null),
        units: options.t && options.t === 'c' ? UNITS_CELSIUS : UNITS_FAHRENHEIT
    };
};

exports.makeCreateOptions = (optionsValidator) => (cliArguments) => {
    if (!optionsValidator.validatePlace(cliArguments)) {
        throw new Error('Missing or invalid place');
    }
    if (!optionsValidator.validateUnits(cliArguments)) {
        throw new Error('Missing or invalid units');
    }
    return Object.freeze({
        getPlace: () => (cliArguments.c ? cliArguments.c : cliArguments.z),
        getUnits: () => cliArguments.t,
        getRunLastCommand: () => (cliArguments.l ? cliArguments.l : false),
        getUseGeolocation: () => (cliArguments.g ? cliArguments.g : false),
        getHelp: () => (cliArguments.h ? cliArguments.h : false)
    });
};

exports.getRequestData = (cliArguments) => {
    return R.omit(['_'], cliArguments);
};
