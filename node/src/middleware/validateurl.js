const { URL } = require('url');
const InputValidationError = require('../errors/InputValidationError');

const validateGetParams = function(req, res, next) {
    let badURL = req.query.url;
    try {
        badURL = new URL(badURL); 
    } catch(e) {
        return next(new InputValidationError(e));
    }

    res.locals.host = badURL.host; // example.org:91
    res.locals.hostname = badURL.hostname; // example.org
    res.locals.pathname = badURL.pathname; // /abc/xyz
    res.locals.protocol = badURL.protocol; // https
    res.locals.search   = badURL.search; // ?123

    return next()
}

const validatePostParams = function(req, res, next) {
    if (!req.body.urls) {
        return next(new InputValidationError('At least one URL must be provided'))
    }
    return next()
    // check if its an array
}

module.exports = {
    validateGetParams,
    validatePostParams,
}