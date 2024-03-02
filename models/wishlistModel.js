const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    movieId: {
        type :String,
        required: [true,'A Wishlist should have a movieID'],
        unique:true
    },
    movieTitle :{
        type :String,
    }
})

const Wishlist = mongoose.model('Wishlist',wishlistSchema)

module.exports = Wishlist