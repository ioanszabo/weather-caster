const { CITY_SEARCH, ZIPCODE_SEARCH, UNITS_CELSIUS, UNITS_FAHRENHEIT } = require('./entity/request');

exports.validateRequest = (place, searchType, units) => {
    if (typeof place !== 'string' || place.length === 0) {
        return false;
    }
    if ([CITY_SEARCH, ZIPCODE_SEARCH].indexOf(searchType) === -1) {
        return false;
    }
    if ([UNITS_CELSIUS, UNITS_FAHRENHEIT].indexOf(units) === -1) {
        return false;
    }
    return true;
};
