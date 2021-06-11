const fsExtra = require('fs-extra');
const path = require('path');
const os = require('os');
require('dotenv').config();
const { makeGetUrlByCity, makeGetUrlByZipCode } = require('./got-api-helper');
const { makeLoadLastConfig, makeSaveLastConfig, makeReadCities } = require('./file-helper');

const homeDirectory = os.homedir();
const location = path.resolve(`${homeDirectory}/${process.env.LATEST_CONFIG}`);
const baseUrl = process.env.GOT_BASE_URL;
const appKey = process.env.GOT_API_KEY;

const loadLastConfig = makeLoadLastConfig(location, fsExtra);
const readCities = makeReadCities(fsExtra);
const saveLastConfig = makeSaveLastConfig(location, fsExtra);

exports.configHelper = Object.freeze({
    getUrlByCity: makeGetUrlByCity(baseUrl, appKey),
    getUrlByZipCode: makeGetUrlByZipCode(baseUrl, appKey)
});

exports.fileHelper = Object.freeze({
    loadLastConfig,
    readCities,
    saveLastConfig
});
