const { makeFetchController } = require('../../src/router');
const { fetchController } = require('../../src/router');
const { weatherControllers, getHelp } = require('../../src/controller');

test('node weather -c paris -t c', async () => {
    const [controller, args] = await fetchController({
        c: 'paris',
        t: 'c'
    });
    const expectedController = weatherControllers.getWeatherByCityController;
    const expectedArgs = { c: 'paris', t: 'c' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});

test('node weather -z 38000,fr -t f', async () => {
    const [controller, args] = await fetchController({
        z: '38000,fr',
        t: 'f'
    });
    const expectedController = weatherControllers.getWeatherByZipCodeController;
    const expectedArgs = { z: '38000,fr', t: 'f' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});

test('node weather -l', async () => {
    const showCityPrompt = jest.fn();
    const showCityPromptGeoLocation = jest.fn();
    const showUnitOfTemperature = jest.fn();
    const fileHelper = {
        loadLastConfig: () => ({ c: 'paris', t: 'c' })
    };

    const fetchControllerWithMocks = makeFetchController(
        weatherControllers, getHelp, fileHelper, showCityPrompt, showCityPromptGeoLocation, showUnitOfTemperature);

    const [controller, args] = await fetchControllerWithMocks({
        l: true
    });
    const expectedController = weatherControllers.getWeatherByCityController;
    const expectedArgs = { c: 'paris', t: 'c' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});

test('node weather -t c', async () => {
    const showCityPrompt = jest.fn();
    const showCityPromptGeoLocation = jest.fn();
    const showUnitOfTemperature = jest.fn();
    const fileHelper = {
        loadLastConfig: jest.fn()
    };
    showCityPrompt.mockReturnValueOnce('paris');

    const fetchControllerWithMocks = makeFetchController(
        weatherControllers, getHelp, fileHelper, showCityPrompt, showCityPromptGeoLocation, showUnitOfTemperature);

    const [controller, args] = await fetchControllerWithMocks({
        t: 'c'
    });
    const expectedController = weatherControllers.getWeatherByCityController;
    const expectedArgs = { c: 'paris', t: 'c' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});

test('node weather -c paris', async () => {
    const showCityPrompt = jest.fn();
    const showCityPromptGeoLocation = jest.fn();
    const showUnitOfTemperature = jest.fn();
    const fileHelper = {
        loadLastConfig: jest.fn()
    };
    showUnitOfTemperature.mockReturnValueOnce('c');

    const fetchControllerWithMocks = makeFetchController(
        weatherControllers, getHelp, fileHelper, showCityPrompt, showCityPromptGeoLocation, showUnitOfTemperature);

    const [controller, args] = await fetchControllerWithMocks({
        c: 'paris'
    });
    const expectedController = weatherControllers.getWeatherByCityController;
    const expectedArgs = { c: 'paris', t: 'c' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});

test('node weather -z 38000,fr', async () => {
    const showCityPrompt = jest.fn();
    const showCityPromptGeoLocation = jest.fn();
    const showUnitOfTemperature = jest.fn();
    const fileHelper = {
        loadLastConfig: jest.fn()
    };
    showUnitOfTemperature.mockReturnValueOnce('f');

    const fetchControllerWithMocks = makeFetchController(
        weatherControllers, getHelp, fileHelper, showCityPrompt, showCityPromptGeoLocation, showUnitOfTemperature);

    const [controller, args] = await fetchControllerWithMocks({
        z: '38000,fr'
    });
    const expectedController = weatherControllers.getWeatherByZipCodeController;
    const expectedArgs = { z: '38000,fr', t: 'f' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});

test('node weather', async () => {
    const showCityPrompt = jest.fn();
    const showCityPromptGeoLocation = jest.fn();
    const showUnitOfTemperature = jest.fn();
    const fileHelper = {
        loadLastConfig: jest.fn()
    };
    showCityPromptGeoLocation.mockReturnValueOnce('paris');
    showUnitOfTemperature.mockReturnValueOnce('f');

    const fetchControllerWithMocks = makeFetchController(
        weatherControllers, getHelp, fileHelper, showCityPrompt, showCityPromptGeoLocation, showUnitOfTemperature);

    const [controller, args] = await fetchControllerWithMocks({});
    const expectedController = weatherControllers.getWeatherByCityController;
    const expectedArgs = { c: 'paris', t: 'f' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});

test('node weather --import ./cities.json', async () => {
    const showCityPrompt = jest.fn();
    const showCityPromptGeoLocation = jest.fn();
    const showUnitOfTemperature = jest.fn();
    const fileHelper = {
        loadLastConfig: jest.fn()
    };

    const fetchControllerWithMocks = makeFetchController(
        weatherControllers, getHelp, fileHelper, showCityPrompt, showCityPromptGeoLocation, showUnitOfTemperature);

    const [controller, args] = await fetchControllerWithMocks({ import: './cities.json' });
    const expectedController = weatherControllers.getWeatherForMultipleCitiesController;
    const expectedArgs = { import: './cities.json' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});

test('node weather --nogeolocation', async () => {
    const showCityPrompt = jest.fn();
    const showCityPromptGeoLocation = jest.fn();
    const showUnitOfTemperature = jest.fn();
    const fileHelper = {
        loadLastConfig: jest.fn()
    };
    showCityPrompt.mockReturnValueOnce('paris');
    showUnitOfTemperature.mockReturnValueOnce('c');

    const fetchControllerWithMocks = makeFetchController(
        weatherControllers, getHelp, fileHelper, showCityPrompt, showCityPromptGeoLocation, showUnitOfTemperature);

    const [controller, args] = await fetchControllerWithMocks({ nogeolocation: true });
    const expectedController = weatherControllers.getWeatherByCityController;
    const expectedArgs = { c: 'paris', t: 'c' };

    expect(controller).toBe(expectedController);
    expect(args).toStrictEqual(expectedArgs);
});
