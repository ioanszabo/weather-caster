const path = require('path');
const fs = require('fs');
const { createDefaultConfigurationFile } = require('../../src/config/config');
const { createDefaultConfigurationEntity, getDefaultConfiguration } = require('../../src/config/config');
const { CITY_SEARCH, UNITS_CELSIUS } = require('../../src/entity/request');

test('Check if user already has a config file', () => {
    const defaultConfiguration = getDefaultConfiguration(path.resolve('tests/config/location-with-config-file/.weather/config.json'));
    const expected = {
        searchType: CITY_SEARCH,
        units: UNITS_CELSIUS
    };

    expect(defaultConfiguration).toStrictEqual(expected);
});

test('Configuration file is missing so null will be returned', () => {
    const defaultConfiguration = getDefaultConfiguration(path.resolve('./location-without-config-file/.weather/config.json'));

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
    const location = path.resolve('./location-to-create-default-config-file/.weather/config.json');
    const defaultConfiguration = getDefaultConfiguration(path.resolve('./location-without-config-file/.weather/config.json'));
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
