const got = require('got');
const { createResponse } = require('../entity');
const { configHelper } = require('../helper');
const { makeFetchByCityName, makeFetchByZipCode, makeFetchCityByIp } = require('./data-access');

exports.fetchWeatherByCityName = makeFetchByCityName(configHelper.getUrlByCity, got, createResponse);
exports.fetchWeatherByZipCode = makeFetchByZipCode(configHelper.getUrlByZipCode, got, createResponse);
exports.fetchCityByIp = makeFetchCityByIp({
    getCityByIp(ip) {
        return fetch(`http://ip-api.com/json/${ip}`);
    }
});
