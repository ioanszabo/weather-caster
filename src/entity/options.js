const R = require('ramda');
const { UNITS_CELSIUS, UNITS_FAHRENHEIT } = require('./request');

exports.transformToRequestEntity = (options) => {
    return {
        place: options && options.c ? options.c : (options.z ? options.z : null),
        units: options.t && options.t === 'f' ? UNITS_FAHRENHEIT : UNITS_CELSIUS
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
        getUnits: () => cliArguments.t
    });
};

exports.getRequestData = (cliArguments) => {
    return R.omit(['_'], cliArguments);
};
