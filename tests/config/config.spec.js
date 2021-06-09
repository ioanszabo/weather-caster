const { UNITS_CELSIUS, UNITS_FAHRENHEIT } = require('../../src/entity/request');
const { getUrlByCity, getUrlByZipCode } = require('../../src/config/config');

const appKey = process.env.GOT_API_KEY;

test.each([
    [UNITS_CELSIUS, 'Urdorf', `http://api.openweathermap.org/data/2.5/weather?q=Urdorf&appid=${appKey}&units=${UNITS_CELSIUS}`],
    [UNITS_FAHRENHEIT, 'Paris', `http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${appKey}&units=${UNITS_FAHRENHEIT}`]
])('By city name, %s and %s, should return url %s', (units, cityName, expected) => {
    const url = getUrlByCity(cityName, { units });
    expect(url).toEqual(expected);
});

test.each([
    [UNITS_CELSIUS, 8092, 'ch', `http://api.openweathermap.org/data/2.5/weather?zip=8092,ch&appid=${appKey}&units=${UNITS_CELSIUS}`],
    [UNITS_FAHRENHEIT, 75015, 'fr', `http://api.openweathermap.org/data/2.5/weather?zip=75015,fr&appid=${appKey}&units=${UNITS_FAHRENHEIT}`]
])('By zip code, %s %s, and %s, should return url %s', (units, zipCode, countryCode, expected) => {
    const url = getUrlByZipCode(zipCode, countryCode, { units });
    expect(url).toEqual(expected);
});
