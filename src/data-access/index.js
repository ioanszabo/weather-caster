const got = require('got');
const { createResponse } = require('../entity');
const { getUrlByCity, getUrlByZipCode } = require('../config/config');
const { makeFetchByCityName, makeFetchByZipCode } = require('./data-access');

exports.fetchWeatherByCityName = makeFetchByCityName(getUrlByCity, got, createResponse);
exports.fetchWeatherByZipCode = makeFetchByZipCode(getUrlByZipCode, got, createResponse);
