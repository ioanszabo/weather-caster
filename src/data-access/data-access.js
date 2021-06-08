const got = require('got');
const { createResponse } = require('../entity/response');

exports.makeFindByCityName = (getByCityNameUrl) => async (cityName, options) => {
    try {
        const response = await got(getByCityNameUrl(cityName, options));
        return createResponse(response.body);
    } catch (error) {
        return createResponse(error.response.body);
    }
};

exports.makeFindByZipCode = (getByZipCodeUrl) => async (zipCode, countryCode, options) => {
    try {
        const response = await got(getByZipCodeUrl(zipCode, countryCode, options));
        return createResponse(response.body);
    } catch (error) {
        return createResponse(error.response.body);
    }
};
