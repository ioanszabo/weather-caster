const fs = require('fs');
const fsExtra = require('fs-extra');
const { UNITS_CELSIUS } = require('../entity/request');
require('dotenv').config();

const baseUrl = process.env.GOT_BASE_URL;
const appKey = process.env.GOT_API_KEY;

exports.getUrlByCity = (request) => {
    return `${baseUrl}?q=${request.getPlace()}&appid=${appKey}&units=${request.getUnits()}`;
};

exports.getUrlByZipCode = (request) => {
    return `${baseUrl}?zip=${request.getPlace()}&appid=${appKey}&units=${request.getUnits()}`;
};

exports.getDefaultConfiguration = (location) => {
    if (!fs.existsSync(location)) {
        return null;
    }
    const configData = fs.readFileSync(location, 'utf-8');
    const parsed = JSON.parse(configData);
    return {
        useGeolocation: parsed.useGeolocation,
        runLastQuery: parsed.runLastQuery,
        units: parsed.units
    };
};

exports.createDefaultConfigurationFile = (location, data) => {
    fsExtra.outputFileSync(location, JSON.stringify(data));
};

exports.createDefaultConfigurationEntity = () => {
    return Object.freeze({
        units: UNITS_CELSIUS,
        useGeolocation: false,
        runLastQuery: false
    });
};

exports.saveLastConfig = (location, data) => {
    fsExtra.outputFileSync(location, JSON.stringify(data));
};

exports.loadLastConfig = (location) => {
    const configData = fs.readFileSync(location, 'utf-8');
    return JSON.parse(configData);
};
