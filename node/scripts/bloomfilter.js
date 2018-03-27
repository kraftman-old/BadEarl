const redis    = require('redis');
const bluebird = require('bluebird');
const uuidv4   = require('uuid/v4');

redis.add_command('BF.ADD')
redis.add_command('BF.EXISTS')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const red = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

red.on("error", function (err) {
    console.log("Error " + err);
});

//red.addCommand('BF.ADD');
// red.add_command('BF.EXISTS');
// red.add_command('BF.MADD');
// red.add_command('BF.MEXISTS');

const badURLsKey = 'badUrls'

const getRandomString = function(length) {
    let s = '';
    while (s.length < length) {
        s += uuidv4();
    }

    return s.substring(0, length);
}

const bloom = {
    add: function(value) {
        red['BF.ADD'](['bloom', value], function(err, res ) {
            if (err) {
                console.log('err: ', err)
            }
        } )
        
    },
    exists: function(value) {
        red['BF.EXISTS'](['bloom', value], function(err, res ) {console.log(res)} )
    }

}

bloom.add('test')
let randomString;
console.log('starting')
const addAMillion = function() {
    for (let i = 0; i < 1.5*1000000; i++ ){
        randomString = getRandomString(2000);
        bloom.add(randomString);
    }
}
//for (let i = 1; i < 8; i++) {
//    console.log(i)
    addAMillion()
//}

console.log('done')

//bloom.exists('test')
//bloom.exists('this')