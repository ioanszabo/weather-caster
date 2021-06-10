const got = require('got');
const { createResponse } = require('../entity');
const { configHelper } = require('../helper');
const { makeFetchByCityName, makeFetchByZipCode } = require('./data-access');

exports.fetchWeatherByCityName = makeFetchByCityName(configHelper.getUrlByCity, got, createResponse);
exports.fetchWeatherByZipCode = makeFetchByZipCode(configHelper.getUrlByZipCode, got, createResponse);
