#!/usr/bin/env node
const clp = require('clp');
const { fetchController } = require('./src/router');
const { createRequest } = require('./src/entity');
const { getRequestData } = require('./src/entity/options');
const { weatherControllers, getHelp } = require('./src/controller/index');

const displayResults = (resolved) => resolved.map(((d) => console.log(d.getData())));
const executeControllerWithArguments = ([controller, args]) => controller(args);
const waitForAllPromisesToResolve = (weatherDetails) => Promise.all(weatherDetails);
const displayError = (error) => console.log(error);

try {
    const cliArguments = getRequestData(clp(process.argv), createRequest);
    const getControllerAndArguments = fetchController(weatherControllers, getHelp)(cliArguments);
    getControllerAndArguments
        .then(executeControllerWithArguments)
        .then(waitForAllPromisesToResolve)
        .then(displayResults)
        .catch(displayError);

} catch (error) {
    console.log(error.message);
}
