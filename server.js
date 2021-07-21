require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const parkingsRouter = require('./routes/parking/parkingmeter')

app.use('/parking/parkingmeter', parkingsRouter)

app.listen(3000, () => {
    console.log('Server running on port 3000.');
})