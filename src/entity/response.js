exports.createResponse = (response) => {
    if (response.cod === 200) {
        return {
            getData: () => ({
                temp: response.main.temp,
                humidity: response.main.humidity,
                weatherDescription: response.weather.map((weather) => weather.description)
            }),
            hasError: () => false,
            getError: () => ''
        };
    }
    return {
        getData: () => null,
        hasError: () => true,
        getError: () => response.message
    };
};
