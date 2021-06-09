const { createRequest } = require('../entity');

exports.makeGetWeatherByZipCode = (
    findByZipCode,
    transformToRequestEntity,
    saveLastConfig
) => (cliArguments) => {
    saveLastConfig(cliArguments);
    const request = createRequest(transformToRequestEntity(cliArguments));
    return findByZipCode(request);
};
