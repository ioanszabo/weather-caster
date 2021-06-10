exports.makeFetchByCityName = (getByCityNameUrl, got, createResponse) => async (request) => {
    try {
        const response = await got(getByCityNameUrl(request), { responseType: 'json' });
        return createResponse(response.body);
    } catch (error) {
        return createResponse(error.response.body);
    }
};

exports.makeFetchByZipCode = (getByZipCodeUrl, got, createResponse) => async (request) => {
    try {
        const response = await got(getByZipCodeUrl(request), { responseType: 'json' });
        return createResponse(response.body);
    } catch (error) {
        return createResponse(error.response.body);
    }
};
