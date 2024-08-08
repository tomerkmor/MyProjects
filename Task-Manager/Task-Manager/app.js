const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

// middlware
app.use(express.static('./public'))
// create json object inside req.body
app.use(express.json())

// routes
app.use('/someVeryLongLink/api/v1/tasks', tasks)


// invoke connectDB
const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) // (invoking the dotenv package)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
