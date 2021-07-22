const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// Create user
router.post('/', async (req, res) => {
    try {
        // Check if username is already taken
        const checkUsername = await User.findOne({ username: req.body.username })

        if (checkUsername != null) {
            return res.json({ message: 'This username is already taken.'})
        }

        // Hashing password
        const salt = await bcrypt.genSalt() // default is 10 rounds
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            username: req.body.username,
            password: hashedPassword
        })

        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update user
// router.patch('/:id', getUser, async (req, res) => {
//     if (req.body.username != null) {
//         res.user.username = req.body.username
//     }
//     if (req.body.password != null) {
//         res.user.password = req.body.password
//     }
//     try {
//         const updatedUser = await res.user.save()
//         res.json(updatedUser)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// })

// Delete user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: `User ${req.params.id} has been deleted.`})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

module.exports = router

