const { createRequest } = require('../entity');

exports.makeGetWeatherByCity = (
    findByCityName,
    transformToRequestEntity,
    saveLastConfig
) => (cliArguments) => {
    saveLastConfig(cliArguments);
    const request = createRequest(transformToRequestEntity(cliArguments));
    return [findByCityName(request)];
};
