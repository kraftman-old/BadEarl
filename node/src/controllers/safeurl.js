const express  = require('express');
const red      = require('../dal/redis');

const router = express.Router();


//check the url exists
//check the url is valid?
const validateParams = function(req, res, next) {
    const badURL = req.query.url;

    if (!badURL) {
        res.status(400);
        res.send('please specify a URL!');
        return next('no url passed');
    }
    return next()
}

// pass to redis
// check the result
const checkURL = async function(req, res, next) {
    const urlToCheck = req.query.url;

    try {
        const isBadUrl = await red.isBadUrl(urlToCheck)
        
        if (isBadUrl) {
            return res.send('url is unsafe!')
        } 
        return res.send('url is safe!')
    } catch(err) {
        console.log('error getting from redis: ', err)
        next(err);
    }
}

//only apply this middleware to this route
router.use(validateParams)

router.get('/', checkURL)

router.post('/', function() {})

module.exports = router