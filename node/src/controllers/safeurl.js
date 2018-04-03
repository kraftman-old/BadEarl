const express     = require('express');
const red         = require('../dal/redis');
const validateURL = require('../middleware/validateurl.js');

const router = express.Router();

const buildResponse = function() {
    return {
        data: {
            urls: []
        }
    }
}

// pass to redis
// check the result
const checkURL = async function(req, res, next) {
    //TODO: allow POSTing multiple urls
    const stringToCheck = res.locals.hostname;
        + res.locals.pathname
        + res.locals.search;

    const response = buildResponse()
    try {
        const isBadUrl = await red.isBadURL(stringToCheck)
        const urlResponse = {
            domain: res.locals.hostname,
            safe: !isBadUrl
        }
        response.data.urls.push(urlResponse)
        return res.json(response);
    } catch(err) {
        return next(err);
    }
}

const addURL = async function(req, res, next) {
    const urls = req.body.urls
    try {
        const status = await red.addURLs(urls);
        return res.json({
            data: {
                //TODO: return the URLs
                status: 200,
            }
        })
    } catch(e) {
        next(e);
    }
}

//only apply this middleware to this route
router.get('/', validateURL.validateGetParams);
router.get('/', checkURL)

router.post('/', validateURL.validatePostParams);
router.post('/', addURL)

module.exports = router