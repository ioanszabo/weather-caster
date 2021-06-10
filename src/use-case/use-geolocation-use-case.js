exports.makeUseGeolocationUseCase = (fetchCityByIp) => (ip) => {
    return fetchCityByIp(ip);
};
