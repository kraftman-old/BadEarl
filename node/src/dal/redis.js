const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const red = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

const badURLsKey = 'badUrls'

const isBadUrl = async function(URL) {
    const result = await red.sismemberAsync(badURLsKey, URL);

    if (result === 1) {
        return true
    } else if (result === 0) {
        return false
    } else {
        console.log('unknown result: ', result);
        throw new Error('unknown response from redis');
    }
}

module.exports = { 
    isBadUrl 
}