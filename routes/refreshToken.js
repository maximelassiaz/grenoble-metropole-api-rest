const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const token = req.body.token
    
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        // Check if user still exists
        const checkUser = checkIfUserStillExist(user.id)
        if (!checkUser) return res.json({ message: err.message})

        const refreshedToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'})
        res.json({ accessToken: refreshedToken })
    })
})

async function checkIfUserStillExist(id) {
    try {
        const user = await User.findById(id)
        if (user == null) {
            return res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = router