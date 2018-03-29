const redis = require('redis');
const bluebird = require('bluebird');

redis.add_command('BF.ADD')
redis.add_command('BF.MADD')
redis.add_command('BF.EXISTS')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const red = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

red.on("error", function (err) {
    console.log("Error " + err);
});

const badURLsKey = 'badUrls'

const isBadURL = function(URL) {
    // wrap the callback in a promise
    return new Promise(function(resolve, reject) {
        red['BF.EXISTS']([badURLsKey, URL], function(err, res ) {
            if (err) {
                return reject(Error(err));
            }
            if (res === 1) {
                return resolve(true);
            } else if (res === 0) {
                return resolve(false);
            } 
            console.log('unknown result: ', res);
            return reject(Error('unknown response from redis')); 
        } )
    })
}

const addURLs = function(urls) {
    
    //pipeline this later
    return new Promise(function(resolve, reject) { 
        let status;
        urls.unshift(badURLsKey)
        red['BF.MADD'](urls, function(err, res ) {
            if (err) {
                return reject(Error(err));
            }
            return resolve(res);
        } )
    })
}

module.exports = { 
    isBadURL,
    addURLs
}