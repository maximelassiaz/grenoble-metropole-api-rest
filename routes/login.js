const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user.'})
        }
        const match = await bcrypt.compare(req.body.password, user.password) 
        if (match) {
            const isAdmin = user.role === "Admin" ? true : false
            const accessToken = jwt.sign({ isAdmin: isAdmin, id: user._id}, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken })
        } else {
            res.status(401).json({ message: 'Your username or your password is incorrect.'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router