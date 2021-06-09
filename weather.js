const clp = require('clp');
const expandHomeDir = require('expand-home-dir');
const { useCaseFactory } = require('./src/use-cases');
const { saveLastConfig } = require('./src/config/config');
const { createRequest } = require('./src/entity');
const { getRequestData } = require('./src/entity/options');

try {
    const cliArguments = getRequestData(clp(process.argv), createRequest);
    const useCase = useCaseFactory(cliArguments);
    saveLastConfig(expandHomeDir(process.env.LATEST_CONFIG), cliArguments);
    const weatherDetails = useCase(cliArguments, location);
    weatherDetails
        .then((data) => {
            console.log(data.getData());
        })
        .catch((err) => {
            console.error(err);
        });
} catch (error) {
    console.log(error.message);
}
