const mongoose = require('mongoose')
require('dotenv').config();
const app = require('./app')

const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB)
    .then(console.log('DB connection successful')) 
    .catch(err => console.log('DB connection failure',err))


// const testWishlist = new Wishlist({
//     movieId: 'tt12346',
//     movieTitle : 'Salar'
// })

// testWishlist.save().then(doc =>{
//     console.log('Successfully saved the doc',doc)
// }).catch(err=> {
//     console.log('Error while creating doc',err)
// })

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}...`)
})