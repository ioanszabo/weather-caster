exports.makeGetUrlByCity = (baseUrl, appKey) => (request) => `${baseUrl}?q=${request.getPlace()}&appid=${appKey}&units=${request.getUnits()}`;
exports.makeGetUrlByZipCode = (baseUrl, appKey) => (request) => `${baseUrl}?zip=${request.getPlace()}&appid=${appKey}&units=${request.getUnits()}`;
