const { createRequest } = require('../entity');

exports.makeGetWeatherByCityUseCase = (
    findByCityName,
    transformToRequestEntity,
    saveLastConfig
) => (cliArguments) => {
    saveLastConfig(cliArguments);
    const request = createRequest(transformToRequestEntity(cliArguments));
    return [findByCityName(request)];
};
