const clp = require('clp');
const { fetchController } = require('./src/router');
const { createRequest } = require('./src/entity');
const { getRequestData } = require('./src/entity/options');
const { weatherControllers } = require('./src/controller/index');

try {
    const cliArguments = getRequestData(clp(process.argv), createRequest);
    const [controller, args] = fetchController(weatherControllers)(cliArguments);
    const weatherDetails = controller(args);
    weatherDetails.map((promiseResponse) => {
        return promiseResponse.then((data) => {
            console.log(data.getData());
        })
            .catch((err) => {
                console.error(err);
            });
    });

} catch (error) {
    console.log(error.message);
}
