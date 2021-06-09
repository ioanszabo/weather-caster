const fs = require('fs');
const { makeSaveLastConfig } = require('./config');
const { makeLoadLastConfig } = require('./config');

const location = process.env.LATEST_CONFIG;

exports.loadLastConfig = makeLoadLastConfig(location);
exports.saveLastConfig = makeSaveLastConfig(location);
exports.readCities = (file) => {
    const configData = fs.readFileSync(file, 'utf-8');
    return JSON.parse(configData);
};
