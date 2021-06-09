exports.makeGetWeatherByCity = (findByCityName, createRequest, transformToRequestEntity) => (cliArguments) => {
    const request = createRequest(transformToRequestEntity(cliArguments));
    return findByCityName(request);
};
