const validateParams = function(req, res, next) {
    let badURL = req.query.url;

    if (!badURL) {
        res.status(400);
        res.send('please specify a URL!');
        return next('no url passed');
    }
    badURL = badURL.toLowerCase()
    res.locals.url = badURL
    return next()
}

module.exports = {
    validateParams
}