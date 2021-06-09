exports.makeCreateResponse = (responseValidator) => (response) => {
    if (!responseValidator.isResponse(response)) {
        throw new Error('Missing response');
    }
    if (!responseValidator.hasValidCod(response)) {
        throw new Error('Invalid response - cod is not valid');
    }
    if (!responseValidator.hasValidData(response)) {
        throw new Error('Invalid response - missing data');
    }

    if (response.cod === 200) {
        return Object.freeze({
            getData: () => Object.freeze({
                temp: response.main.temp,
                humidity: response.main.humidity,
                weatherDescription: response.weather.map((weather) => weather.description)
            }),
            hasError: () => false,
            getError: () => ''
        });
    }
    return Object.freeze({
        getData: () => null,
        hasError: () => true,
        getError: () => response.message
    });
};
