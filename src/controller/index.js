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
    console.log('\n' +
        '\n' +
        '\n' +
        '# Without options (will use geolocation); it will prompt for city name and temperature unit measurement\n' +
        'node weather\n' +
        '\n' +
        '# City & unit measurement with the following options: c (Celsius) or f (Fahrenheit)\n' +
        'node weather -c paris -t c\n' +
        '\n' +
        '# Zip code, country code and temperature unit measurement\n' +
        'node weather -z 38000,fr -t f\n' +
        '\n' +
        '# It will get weather data for the last location entered by user  \n' +
        '# It will use ~/.weather/last-config.json \n' +
        'node weather -l\n' +
        '\n' +
        '# Unit measurement; it will prompt for city name\n' +
        'node weather -t c\n' +
        '\n' +
        '# City name; it will prompt for temperature unit measurement\n' +
        'node weather -c paris\n' +
        '\n' +
        '# City name; it will prompt for temperature unit measurement\n' +
        'node weather -z 38000,fr\n' +
        '\n' +
        '# User to provide list of cities; will be displayed first 10 cities from array\n' +
        'node weather --import ./cities.json\n' +
        'example of file content:\n' +
        '[\n' +
        '  \'Paris\',\n' +
        '  \'London\'\n' +
        ']\n' +
        '\n' +
        '# It will not use geolocation; it will prompt for city name and temperature unit measurement\n' +
        'node weather --nogeolocation\n' +
        '\n' +
        '# Displays help\n' +
        'node weather -h');
    return [];
};
