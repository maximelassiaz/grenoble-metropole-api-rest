require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// User Router
const userRouter = require('./routes/users')
app.use('/api/users', userRouter)

// Login Router
const loginRouter = require('./routes/login')
app.use('/api/login', loginRouter)

// RefreshToken Router
const refreshTokenRouter = require('./routes/refreshToken')
app.use('/api/refreshToken', refreshTokenRouter)

// Parking Routers
const parkingmeterRouter = require('./routes/parking/parkingmeters')
app.use('/api/parking/parkingmeters', parkingmeterRouter)

const parkingspaceRouter = require('./routes/parking/parkingspaces')
app.use('/api/parking/parkingspaces', parkingspaceRouter)


app.listen(3000, () => {
    console.log('Server running on port 3000.');
})