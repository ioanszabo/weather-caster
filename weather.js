const clp = require('clp');
const { useCaseFactory } = require('./src/use-cases');
const { createRequest } = require('./src/entity');
const { getRequestData } = require('./src/entity/options');

try {
    const cliArguments = getRequestData(clp(process.argv), createRequest);
    const [useCase, args] = useCaseFactory(cliArguments);

    const weatherDetails = useCase(args);
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
