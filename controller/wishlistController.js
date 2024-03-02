const Wishlist = require('../models/wishlistModel')

//const testWishlist = new Wishlist({
//         movieId: 'tt12347',
//         movieTitle : 'Animal'
//     })

//     testWishlist.save().then(doc =>{
//         console.log('Successfully saved the doc',doc)
//     }).catch(err=> {
//         console.log('Error while creating doc',err)
//     })

const getAllWishlist = async (req, res) => {
    try {
        const wishlists = await Wishlist.find()
        res.status(201).json({
            status: 'success',
            data: {
                wishlists
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'Failure',
            message: err
        })
    }
}

const getWishlist = async (req, res) => {
    try {
        //const wishlist=await Wishlist.findById(req.params.id)
        const wishlist = await Wishlist.findOne({ movieId: req.params.movieId })
        res.status(201).json({
            status: 'success',
            data: {
                wishlist
            }
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'Failure',
            message: err
        })
    }
}

const createWishlist = async (req, res) => {
    try {
        const newWishlist = await Wishlist.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                wishlist: newWishlist
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Failure',
            message: err
        })
    }

}

const updateWishlist = async (req, res) => {
    try {
        const newWishlist = await Wishlist.findOneAndUpdate({movieId:req.params.movieId}, req.body, {
            new: true,
            runValidators:true
        })
        res.status(201).json({
            status: 'success',
            data: {
                wishlist: newWishlist
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Failure',
            message: err
        })
    }
}

const deleteWishlist = async (req, res) => {
    try {
       const deleteWishlist = await Wishlist.findOneAndDelete({movieId:req.params.movieId})
        res.status(204).json({
            status: 'Success',
            data: deleteWishlist
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'Failure',
            message: err
        })
    }
}

module.exports = {
    createWishlist,
    getAllWishlist,
    getWishlist,
    deleteWishlist
}