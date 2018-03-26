const express  = require('express');
const safeURL  = require('./src/controllers/safeurl.js');

const app = express();

app.use('/safeurl', safeURL)

app.use('*', (req, res, next) => {
    return res.send('unkown route')
})

app.listen(process.env.HTTP_PORT, () => console.log('Up!'))