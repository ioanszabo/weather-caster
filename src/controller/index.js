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

exports.getHelp = () => {
    console.log('NAME');
    console.log('\tweather - display weather for given city/zip code');
    console.log('SYNOPSIS');
    console.log('\tweather [OPTION]...');
    console.log('DESCRIPTION');
    console.log('\t-c');
    console.log('\t\tspecify city name');
    console.log('\t-t');
    console.log('\t\tspecify unit of measurement for temperature - allowed (f or c)');
    console.log('\t-z');
    console.log('\t\tspecify zip code');
    console.log('\t--import');
    console.log('\t\tspecify a json file with cities - max 10 cities');
    return [];
};
