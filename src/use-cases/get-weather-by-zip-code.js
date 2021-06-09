exports.makeGetWeatherByZipCode = (findByZipCode, createRequest, transformToRequestEntity) => (cliArguments) => {
    const request = createRequest(transformToRequestEntity(cliArguments));
    return findByZipCode(request);
};
