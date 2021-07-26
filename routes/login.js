const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user == null) {
            return res.status(404).json({ message: 'Invalid credentials'})
        }

        const match = await bcrypt.compare(req.body.password, user.password) 
        if (match) {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            res.json({ accessToken, refreshToken })
        } else {
            res.status(401).json({ message: 'Invalid credentials'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

function generateAccessToken(user) {
    const isAdmin = user.role === "Admin" ? true : false
    return jwt.sign({ isAdmin: isAdmin, id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'})
}

function generateRefreshToken(user) {
    const isAdmin = user.role === "Admin" ? true : false
    return jwt.sign({ isAdmin: isAdmin, id: user._id }, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = router