const redis = require('redis');
const bluebird = require('bluebird');

redis.add_command('BF.ADD')
redis.add_command('BF.EXISTS')
const red = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

red.on("error", function (err) {
    console.log("Error " + err);
});

//red.addCommand('BF.ADD');
// red.add_command('BF.EXISTS');
// red.add_command('BF.MADD');
// red.add_command('BF.MEXISTS');

const badURLsKey = 'badUrls'

const bloom = {
    add: function(value) {
        red['BF.ADD'](['bloom', value], function(err, res ) {console.log(res)} )

        // red.send_command('BF.ADD', ['bloom', value], function(res) {
        //     console.log(res)
        // })
        
    },
    exists: function(value) {
        red['BF.EXISTS'](['bloom', value], function(err, res ) {console.log(res)} )
    }

}


bloom.add('test')
bloom.exists('test')
//bloom.exists('this')