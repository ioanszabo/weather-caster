const { makeCreateResponse } = require('./response');
const { makeCreateRequest } = require('./request');
const responseValidator = require('../validator/response-validator');
const requestValidator = require('../validator/request-validator');

exports.createResponse = makeCreateResponse(responseValidator);
exports.createRequest = makeCreateRequest(requestValidator);
