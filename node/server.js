const express  = require('express');
const bluebird = require('bluebird');
const redis    = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const app = express();


const red = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
 
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
    const badURL = req.query.url;

    red.sismemberAsync('badUrls', badURL)
    .then(result => {
        console.log(result)

        if (result === 0) {
            return res.send('url is safe!')
        } else if (result === 1) {
            return res.send('url is unsafe!')
        } else {
            console.log('unknown result: ', result)
            res.send('unkown error occured')
            return Promise.reject('unknown error')
        }
    })
    .catch(err => {
        console.log('error getting from redis: ', err)
        next(err);
    });
}

app.use(validateParams)

app.get('/safeurl', checkURL)

app.listen(process.env.HTTP_PORT, () => console.log('Up!'))