exports.CITY_SEARCH = 1;
exports.ZIPCODE_SEARCH = 2;
exports.UNITS_CELSIUS = 'metric';
exports.UNITS_FAHRENHEIT = 'imperial';

exports.makeCreateRequest = (requestValidator) => ({ place, units }) => {
    if (!requestValidator.validatePlace(place)) {
        throw new Error('Value for place is not valid');
    }
    if (!requestValidator.validateUnits(units)) {
        throw new Error('Value for units is not valid');
    }
    return Object.freeze({
        getPlace: () => place,
        getUnits: () => units
    });
};
