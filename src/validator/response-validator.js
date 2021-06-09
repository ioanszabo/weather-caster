exports.isResponse = (response) => response;
exports.hasValidCod = (response) => !(!response.cod || !Number.isInteger(response.cod * 1) || response.cod < 0);
exports.hasValidData = (response) => {
    if (!response.main) {
        return false;
    }
    if ((response.main.temp || response.main.humidity) &&
        (response.weather && Array.isArray(response.weather) && response.weather.length > 0)) {
        return true;
    }
    return false;
};
