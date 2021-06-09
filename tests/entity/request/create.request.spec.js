const validator = require('../../../src/validator/request-validator');
const { makeCreateRequest, UNITS_CELSIUS, CITY_SEARCH } = require('../../../src/entity/request');

test('Create valid request', () => {
    const place = 'Urdorf';
    const units = UNITS_CELSIUS;
    const createRequest = makeCreateRequest(validator);
    const request = createRequest({ place: 'Urdorf', searchType: CITY_SEARCH, units: UNITS_CELSIUS });

    expect(request.getPlace()).toBe(place);
    expect(request.getUnits()).toBe(units);
});

test.each([
    ['', 1],
    ['Urdorf', 1],
    ['Urdorf', 30],
    ['Urdorf', -3]
])('Should throw error for %s, %s', (place, units) => {
    const createRequest = makeCreateRequest(validator);
    expect(() => createRequest({ place, units })).toThrowError();
});
