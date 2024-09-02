const mongoose = require('mongoose')

const HouseCard = new mongoose.Schema({
    images: Array,
    title: String,
    price: Number,
    currency: String,
    floors: Number,
    rooms: Number,
    bedrooms: Number,
    area: Number,
    streetAddress: String,
    loaction: String,
    date: String,
    location: String,
})

module.exports = mongoose.model('HouseCard', HouseCard)