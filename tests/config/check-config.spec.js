const path = require('path');
const fs = require('fs');
const { createDefaultConfigurationFile } = require('../../src/helper/config');
const { createDefaultConfigurationEntity, getDefaultConfiguration } = require('../../src/helper/config');
const { CITY_SEARCH, UNITS_CELSIUS } = require('../../src/entity/request');

test('Check if user already has a helper file', () => {
    const defaultConfiguration = getDefaultConfiguration(path.resolve('tests/helper/location-with-helper-file/.weather/helper.json'));
    const expected = {
        searchType: CITY_SEARCH,
        units: UNITS_CELSIUS
    };

    expect(defaultConfiguration).toStrictEqual(expected);
});

test('Configuration file is missing so null will be returned', () => {
    const defaultConfiguration = getDefaultConfiguration(path.resolve('./location-without-helper-file/.weather/helper.json'));

    expect(defaultConfiguration).toBeNull();
});

test('Create default configuration data', () => {
    const expected = {
        units: UNITS_CELSIUS,
        useGeolocation: false,
        runLastQuery: false
    };
    const defaultConfiguration = createDefaultConfigurationEntity();

    expect(defaultConfiguration).toStrictEqual(expected);
});

test('Create default configuration to given location', () => {
    const location = path.resolve('./location-to-create-default-helper-file/.weather/helper.json');
    const defaultConfiguration = getDefaultConfiguration(path.resolve('./location-without-helper-file/.weather/helper.json'));
    if (!defaultConfiguration) {
        createDefaultConfigurationFile(location, createDefaultConfigurationEntity());
    }
    const expected = {
        runLastQuery: false,
        units: 'metric',
        useGeolocation: false
    };

    expect(getDefaultConfiguration(location)).toStrictEqual(expected);
    fs.unlinkSync(location);
});
