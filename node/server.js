
const express  = require('express');
const bodyParser = require('body-parser');
const getSafeURL  = require('./src/controllers/getsafeurl');
const createSafeURL  = require('./src/controllers/createsafeurl');
const errorHandler = require('./src/middleware/errorhandler');
const app = express();

app.use(bodyParser.json());

app.use('/urlinfo/1/', getSafeURL)
app.use('/urlinfo/1/', createSafeURL)

app.use('*', (req, res, next) => {
    return res.send('unkown route')
})

app.use(errorHandler);

app.listen(process.env.HTTP_PORT, () => console.log('Up!'))