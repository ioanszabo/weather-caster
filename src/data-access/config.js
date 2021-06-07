require('dotenv').config();

const baseUrl = process.env.GOT_BASE_URL;
const appKey = process.env.GOT_API_KEY;

exports.getByCityNameUrl = (cityName, options) => {
    const { units } = options;
    return `${baseUrl}?q=${cityName}&appid=${appKey}&units=${units}`;
};

exports.getByZipCodeUrl = (zipCode, countryCode, options) => {
    const { units } = options;
    return `${baseUrl}?zip=${zipCode},${countryCode}&appid=${appKey}&units=${units}`;
};
