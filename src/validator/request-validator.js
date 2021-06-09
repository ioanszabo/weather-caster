const { UNITS_CELSIUS, UNITS_FAHRENHEIT } = require('../entity/request');

exports.validatePlace = (place) => !(typeof place !== 'string' || place.length === 0);
exports.validateUnits = (units) => [UNITS_CELSIUS, UNITS_FAHRENHEIT].indexOf(units) !== -1;
