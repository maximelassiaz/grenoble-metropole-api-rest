const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: {
            values: ['Admin', 'User'],
            message: '{VALUE} is not supported for role'
        },
        default: 'User',
        required: [true, 'Role is required']
    }
})

module.exports = mongoose.model('User', user)