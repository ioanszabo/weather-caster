exports.createResponse = (response) => {
    return {
        temp: response.main.temp,
        humidity: response.main.humidity,
        weatherDescription: response.weather.map((weather) => weather.description)
    };
};
