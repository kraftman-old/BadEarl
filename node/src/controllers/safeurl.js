const express     = require('express');
const red         = require('../dal/redis');
const validateURL = require('../middleware/validateurl.js');

const router = express.Router();

// pass to redis
// check the result
const checkURL = async function(req, res, next) {
    const domainToCheck = res.locals.hostname;

    try {
        const isBadUrl = await red.isBadUrl(domainToCheck)
        
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
router.use(validateURL.validateParams)

router.get('/', checkURL)

router.post('/', function() {})

module.exports = router