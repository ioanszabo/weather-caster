const readJson = (file, fs) => {
    return fs.readJsonSync(file);
};

exports.makeSaveLastConfig = (location, fs) => (data) => fs.outputFileSync(location, JSON.stringify(data));

exports.makeLoadLastConfig = (location, fs) => () => readJson(location, fs);

exports.makeReadCities = (fs) => (file) => readJson(file, fs);
