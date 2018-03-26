const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Working!'))

app.listen(process.env.HTTP_PORT, () => console.log('Up!'))