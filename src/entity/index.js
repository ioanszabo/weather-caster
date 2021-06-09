const { makeCreateResponse } = require('./response');
const { makeCreateRequest } = require('./request');
const { makeCreateOptions } = require('./options');
const responseValidator = require('../validator/response-validator');
const requestValidator = require('../validator/request-validator');
const optionsValidator = require('../validator/options-validator');

exports.createResponse = makeCreateResponse(responseValidator);
exports.createRequest = makeCreateRequest(requestValidator);
exports.createOptions = makeCreateOptions(optionsValidator);
