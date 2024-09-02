const mongoose = require('mongoose')

const User = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('User', User)