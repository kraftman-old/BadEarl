const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const red = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

red.on("error", function (err) {
    console.log("Error " + err);
});

const badURLsKey = 'badUrls'

const isBadURL = async function(URL) {
    console.log(URL)
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

const addURLs = async function(urls) {

    //pipeline this later
    let status;
    for(let url of urls) {
        console.log('addding', url)
        status = await red.sadd(badURLsKey, url);
        console.log(status)
        return status;
    };
}

module.exports = { 
    isBadURL,
    addURLs
}