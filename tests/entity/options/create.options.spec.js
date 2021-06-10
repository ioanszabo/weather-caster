const { UNITS_CELSIUS } = require('../../../src/entity/request');
const { createOptions, createRequest } = require('../../../src/entity');
const { getRequestData } = require('../../../src/entity/options');

test('Create valid options entity', () => {
    const cliOptions = {
        c: 'paris',
        t: 'c'
    };
    const optionsEntity = createOptions(cliOptions);
    const expected = {
        c: 'paris',
        t: 'c'
    };

    expect(optionsEntity.getPlace()).toBe(expected.c);
    expect(optionsEntity.getUnits()).toBe(expected.t);
    expect(optionsEntity.getRunLastCommand()).toBeFalsy();
    expect(optionsEntity.getUseGeolocation()).toBeFalsy();
});

test.each([
    [{ c: 'paris' }, 'Missing or invalid units' ],
    [{ z: '38000,fr' }, 'Missing or invalid units' ],
    [{ t: 'c' }, 'Missing or invalid place' ],
    [{ t: 'f' }, 'Missing or invalid place' ],
    [{ c: 'paris', g: true }, 'Missing or invalid units' ]
])('%o - should throw error', (cliOptions, error) => {
    expect(() => createOptions(cliOptions)).toThrowError(error);
});

test('Get correct arguments from cli', () => {
    const cliArguments = getRequestData({
            _: [
                '/home/szabo/.nvm/versions/node/v12.22.1/bin/node',
                '/home/szabo/Programming/tests/proton/command/weather.js'
            ],
            c: 'paris',
            t: 'c'
        },
        createRequest
    );
    const expected = {
        c: 'paris',
        t: 'c'
    };

    expect(cliArguments).toStrictEqual(expected);
});
