exports.CITY_SEARCH = 1;
exports.ZIPCODE_SEARCH = 2;
exports.UNITS_CELSIUS = 1;
exports.UNITS_FAHRENHEIT = 2;

exports.makeCreateRequest = (validateRequest) => (place, searchType, units) => {
    if (!validateRequest(place, searchType, units)) {
        throw new Error('Invalid data for request');
    }
    return Object.freeze({ place, searchType, units });
};
