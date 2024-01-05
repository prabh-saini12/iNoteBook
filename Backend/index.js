const express = require('express')
const app = express()
const connectToMongo = require('./db')
const port = 3000

// call connectToMongo function
connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})