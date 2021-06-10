const weatherController = require('./weater-controller');

const {
    getWeatherByCityUseCase,
    getWeatherByZipCodeUseCase,
    getWeatherForMultipleCitiesUseCase
} = require('../use-case');

const getWeatherByCityController = weatherController
    .makeGetWeatherByCityController(getWeatherByCityUseCase);
const getWeatherByZipCodeController = weatherController
    .makeGetWeatherByZipCodeController(getWeatherByZipCodeUseCase);
const getWeatherForMultipleCitiesController = weatherController
    .makeGetWeatherForMultipleCitiesController(getWeatherForMultipleCitiesUseCase);

exports.weatherControllers = Object.freeze({
    getWeatherByCityController,
    getWeatherByZipCodeController,
    getWeatherForMultipleCitiesController
});
