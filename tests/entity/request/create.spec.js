const { validateRequest } = require('../../../src/validator');
const { makeCreateRequest, UNITS_CELSIUS, CITY_SEARCH } = require('../../../src/entity/request');

test('Create valid request', () => {
    const expected = {
        place: 'Urdorf',
        searchType: CITY_SEARCH,
        units: UNITS_CELSIUS
    };
    const createRequest = makeCreateRequest(validateRequest);
    const request = createRequest('Urdorf', CITY_SEARCH, UNITS_CELSIUS);
    expect(request).toStrictEqual(expected);
});

test.each([
    ['', 1, 1],
    ['Urdorf', 30, 1],
    ['Urdorf', 2, 30],
    ['Urdorf', 2, -3]
])('Should throw error for %s, %s, %s', (place, searchType, units) => {
    const createRequest = makeCreateRequest(validateRequest);
    expect(() => createRequest(place, searchType, units)).toThrowError();
});
