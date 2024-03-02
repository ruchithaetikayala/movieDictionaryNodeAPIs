const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    movieId: {
        type :String,
        required: [true,'A movieWiishlist should have a movieID'],
        unique:true
    },
    // rating:{
    //     type: Number,
    //     default: 3.0
    // },
    movieTitle :{
        type :String,
    }
    //movieTitle :String
})

const Wishlist = mongoose.model('Wishlist',wishlistSchema)

module.exports = Wishlist