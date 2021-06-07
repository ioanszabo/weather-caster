exports.createResponse = (response) => {
    if (response.cod === 200) {
        return {
            temp: response.main.temp,
            humidity: response.main.humidity,
            weatherDescription: response.weather.map((weather) => weather.description),
            hasError: false,
            errorMessage: ''
        };
    }
    return {
        temp: null,
        humidity: null,
        weatherDescription: null,
        hasError: true,
        errorMessage: response.message
    };
};
