const express  = require('express');
const red      = require('../dal/redis');

const router = express.Router();

const validateParams = function(req, res, next) {
    const badURL = req.query.url;

    if (!badURL) {
        res.status(400);
        res.send('please specify a URL!');
        return next('no url passed');
    }
    return next()
}

const checkURL = function(req, res, next) {
    const urlToCheck = req.query.url;

    red.isBadUrl(urlToCheck)
    .then( isBadUrl => {
        if (isBadUrl) {
            return res.send('url is unsafe!')
        } 
        return res.send('url is safe!')
    })
    .catch(err => {
        console.log('error getting from redis: ', err)
        next(err);
    });
}

//only apply this middleware to this route
router.use(validateParams)

router.get('/', checkURL)

router.post('/', function() {})

module.exports = router