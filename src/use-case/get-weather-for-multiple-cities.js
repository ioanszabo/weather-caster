const { createRequest } = require('../entity');

exports.makeGetWeatherForMultipleCities = (readCities, findByCityName, transformToRequestEntity) => (args) => {
    const cities = readCities(args.import).slice(0, 10);
    return cities.map((city) => {
        const request = createRequest(transformToRequestEntity({ c: city, t: 'c' }));
        return findByCityName(request);
    });
};
