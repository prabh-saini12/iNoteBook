const express = require('express')
const app = express()
const connectToMongo = require('./db')
const port = 3000

app.use(express.json())
// call connectToMongo function
connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Available Routes
app.use('/api/auth', require('./routes/auth'))

app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})