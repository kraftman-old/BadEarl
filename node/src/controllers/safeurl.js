const express     = require('express');
const red         = require('../dal/redis');
const validateURL = require('../middleware/validateurl.js');

const router = express.Router();

const buildRseponse = function() {
    return {
        data: {
            urls: []
        }
    }
}

// pass to redis
// check the result
const checkURL = async function(req, res, next) {
    const domainToCheck = res.locals.hostname;
    console.log('checking:'+domainToCheck)
    const response = buildRseponse()
    try {
        const isBadUrl = await red.isBadUrl(domainToCheck)
        
        if (isBadUrl) {
            response.data.urls.push({
                domain: res.locals.hostname, 
                safe: false
            })
        } else {
            response.data.urls.push({
                domain: res.locals.hostname, 
                safe: true
            })
        }
        return res.json(response);
    } catch(err) {
        console.log('error getting from redis: ', err)
        res.json({
            error: {
                status: 500,
                mesage: 'Internal server error',
            }
        })
    }
}

//only apply this middleware to this route
router.use(validateURL.validateParams)

router.get('/', checkURL)

router.post('/', function() {})

module.exports = router