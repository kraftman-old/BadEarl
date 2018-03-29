
const express  = require('express');
const safeURL  = require('./src/controllers/safeurl');
const errorHandler = require('./src/middleware/errorhandler');
const app = express();

app.use('/safeurl', safeURL)

app.use('*', (req, res, next) => {
    return res.send('unkown route')
})

app.use(errorHandler);

app.listen(process.env.HTTP_PORT, () => console.log('Up!'))