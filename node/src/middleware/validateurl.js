const { URL } = require('url');

const validateParams = function(req, res, next) {
    let badURL = req.query.url;
    try {
        badURL = new URL(badURL); 
    } catch(e) {
        console.log('error parsing url: ', e)
        res.status(400);
        res.send('Invalid URL!');
        return next(e);
    }
    res.locals.host = badURL.host; // example.org:91
    res.locals.hostname = badURL.hostname; // example.org
    res.locals.pathname = badURL.pathname; // /abc/xyz
    res.locals.protocol = badURL.protocol; // https
    res.locals.search   = badURL.search; // ?123

    return next()
}

module.exports = {
    validateParams
}