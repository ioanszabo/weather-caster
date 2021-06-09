function isCityValid(cliArguments) {
    return typeof cliArguments.c !== 'string' || cliArguments.c.length === 0;
}

function isCountyAndZipCodeValid(cliArguments) {
    return typeof cliArguments.z !== 'string' || cliArguments.z.length === 0;
}

exports.validatePlace = (cliArguments) => {
    if (!cliArguments) {
        return false;
    }
    if (!cliArguments.c && !cliArguments.z) {
        return false;
    }
    if (!isCityValid(cliArguments) &&
        !isCountyAndZipCodeValid(cliArguments)) {
        return false;
    }
    return true;
};

exports.validateUnits = (cliArguments) => {
    return cliArguments.t && ['c', 't'].indexOf(cliArguments.t) !== -1;
};
