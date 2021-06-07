const { createResponse } = require('../../../src/entity/response');

test('Create valid response', () => {
    const apiResponse = {
        coord: { lon: 8.4258, lat: 47.3851 },
        weather: [{ id: 502, main: 'Rain', description: 'heavy intensity rain', icon: '10d' }],
        base: 'stations',
        main: { temp: 17.44, feels_like: 17.59, temp_min: 15.7, temp_max: 18.93, pressure: 1020, humidity: 90 },
        visibility: 10000,
        wind: { speed: 0.45, deg: 0, gust: 0.45 },
        rain: { '1h': 8.65 },
        clouds: { all: 75 },
        dt: 1623084151,
        sys: { type: 2, id: 19109, country: 'CH', sunrise: 1623036643, sunset: 1623093594 },
        timezone: 7200,
        id: 2659332,
        name: 'Urdorf',
        cod: 200
    };
    const response = createResponse(apiResponse);
    const expected = {
        temp: 17.44,
        humidity: 90,
        weatherDescription: ['heavy intensity rain'],
        errorMessage: '',
        hasError: false
    };

    expect(response).toStrictEqual(expected);
});

test('Create fail response', () => {
    const apiResponse = {
        cod: '400',
        message: 'Nothing to geocode'
    };
    const response = createResponse(apiResponse);
    const expected = {
        temp: null,
        humidity: null,
        weatherDescription: null,
        hasError: true,
        errorMessage: 'Nothing to geocode'
    };

    expect(response).toStrictEqual(expected);
});
