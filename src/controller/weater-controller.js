exports.makeGetWeatherByCityController = (getWeatherByCityUseCase) =>
    (cliArguments) => getWeatherByCityUseCase(cliArguments);

exports.makeGetWeatherByZipCodeController = (getWeatherByZipCodeUseCase) =>
    (cliArguments) => getWeatherByZipCodeUseCase(cliArguments);

exports.makeGetWeatherForMultipleCitiesController = (getWeatherForMultipleCitiesUseCase) =>
    (cliArguments) => getWeatherForMultipleCitiesUseCase(cliArguments);
