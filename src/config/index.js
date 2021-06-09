const { makeSaveLastConfig } = require('./config');
const { makeLoadLastConfig } = require('./config');

const location = process.env.LATEST_CONFIG;

exports.loadLastConfig = makeLoadLastConfig(location);
exports.saveLastConfig = makeSaveLastConfig(location);
