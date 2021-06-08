exports.CITY_SEARCH = 1;
exports.ZIPCODE_SEARCH = 2;
exports.UNITS_CELSIUS = 'metric';
exports.UNITS_FAHRENHEIT = 'imperial';

exports.makeCreateRequest = (validateRequest) => (place, searchType, units) => {
    if (!validateRequest(place, searchType, units)) {
        throw new Error('Invalid data for request');
    }
    return {
        getPlace: () => place,
        getSearchType: () => searchType,
        getUnits: () => units
    };
};
