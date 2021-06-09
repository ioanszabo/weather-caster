const { createResponse } = require('../../../src/entity');

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
        data: {
            temp: 17.44,
            humidity: 90,
            weatherDescription: ['heavy intensity rain']
        },
        hasError: false,
        error: ''
    };

    expect(response.getData()).toStrictEqual(expected.data);
    expect(response.hasError()).toBeFalsy();
    expect(response.getError()).toBe('');
});

test.each([
    [undefined, 'Missing response'],
    [{
        weather: [{ id: 502, main: 'Rain', description: 'heavy intensity rain', icon: '10d' }],
        main: { temp: 17.44, feels_like: 17.59, temp_min: 15.7, temp_max: 18.93, pressure: 1020, humidity: 90 }
    }, 'Invalid response - cod is not valid'],
    [{
        cod: 200,
        weather: [{ id: 502, main: 'Rain', description: 'heavy intensity rain', icon: '10d' }]
    }, 'Invalid response - missing data'],
    [{
        cod: 200,
        weather: [{ id: 502, main: 'Rain', description: 'heavy intensity rain', icon: '10d' }],
        main: { feels_like: 17.59, temp_min: 15.7, temp_max: 18.93, pressure: 1020 }
    }, 'Invalid response - missing data'],
    [{
        cod: 200,
        main: { temp: 17.44, feels_like: 17.59, temp_min: 15.7, temp_max: 18.93, pressure: 1020, humidity: 90 }
    }, 'Invalid response - missing data'],
    [{
        cod: 200,
        weather: {},
        main: { temp: 17.44, feels_like: 17.59, temp_min: 15.7, temp_max: 18.93, pressure: 1020, humidity: 90 }
    }, 'Invalid response - missing data'],
    [{
        cod: 200,
        weather: [],
        main: { temp: 17.44, feels_like: 17.59, temp_min: 15.7, temp_max: 18.93, pressure: 1020, humidity: 90 }
    }, 'Invalid response - missing data']
])('Should throw error', (apiResponse, error) => {
    expect(() => createResponse(apiResponse)).toThrowError(error);
});
