const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const red = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

const badURLsKey = 'badUrls'

const isBadUrl = function(URL) {
    return red.sismemberAsync(badURLsKey, URL)
    .then(result => {
        if (result === 1) {
            return Promise.resolve(true)
        } else if (result === 0) {
            return Promise.resolve(false)
        } else {
            console.log('unknown result: ', result);
            return Promise.reject('unknown response from redis');
        }
    })
}

module.exports = { 
    isBadUrl 
}