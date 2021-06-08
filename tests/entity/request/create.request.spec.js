const { validateRequest } = require('../../../src/validator');
const { makeCreateRequest, UNITS_CELSIUS, CITY_SEARCH } = require('../../../src/entity/request');

test('Create valid request', () => {
    const place = 'Urdorf';
    const searchType = CITY_SEARCH;
    const units = UNITS_CELSIUS;
    const createRequest = makeCreateRequest(validateRequest);
    const request = createRequest('Urdorf', CITY_SEARCH, UNITS_CELSIUS);

    expect(request.getPlace()).toBe(place);
    expect(request.getSearchType()).toBe(searchType);
    expect(request.getUnits()).toBe(units);
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
