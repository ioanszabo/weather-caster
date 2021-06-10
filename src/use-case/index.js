const { makeUseGeolocationUseCase } = require('./use-geolocation-use-case');
const { makeGetWeatherForMultipleCities } = require('./get-weather-for-multiple-cities');
const { transformToRequestEntity } = require('../entity/options');
const { makeGetWeatherByCityUseCase } = require('./get-weather-by-city-use-case');
const { fetchCityByIp, fetchWeatherByCityName, fetchWeatherByZipCode } = require('../data-access');
const { makeGetWeatherByZipCode: makeGetWeatherByZipCodeUseCase } = require('./get-weather-by-zip-code');
const { fileHelper } = require('../helper/index');

const getWeatherByCityUseCase = makeGetWeatherByCityUseCase(
    fetchWeatherByCityName,
    transformToRequestEntity,
    fileHelper.saveLastConfig
);
const getWeatherByZipCodeUseCase = makeGetWeatherByZipCodeUseCase(
    fetchWeatherByZipCode,
    transformToRequestEntity,
    fileHelper.saveLastConfig
);
const getWeatherForMultipleCitiesUseCase = makeGetWeatherForMultipleCities(
    fileHelper.readCities,
    fetchWeatherByCityName,
    transformToRequestEntity
);
const useGeolocationUseCase = makeUseGeolocationUseCase(fetchCityByIp);

exports.getWeatherByCityUseCase = getWeatherByCityUseCase;
exports.getWeatherByZipCodeUseCase = getWeatherByZipCodeUseCase;
exports.getWeatherForMultipleCitiesUseCase = getWeatherForMultipleCitiesUseCase;
exports.useGeolocationUseCase = useGeolocationUseCase;

exports.useCases = Object.freeze({
    getWeatherByCityUseCase,
    getWeatherByZipCodeUseCase,
    getWeatherForMultipleCitiesUseCase,
    useGeolocationUseCase
});
