const Wishlist = require('../models/wishlistModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const getAllWishlist = catchAsync(async (req, res,next) => {
    const wishlists = await Wishlist.find()
    res.status(201).json({
        status: 'success',
        results: wishlists.length,
        data: {
            wishlists
        }
    })
})

const getWishlist = catchAsync(async (req, res,next) => {
    const wishlist = await Wishlist.findOne({ movieId: req.params.movieId })

    if(!wishlist){
        next(new AppError(`No wishlist found with the ID-${req.params.movieId}`,404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            wishlist
        }
    })
})

const createWishlist = catchAsync(async (req, res, next) => {
    const newWishlist = await Wishlist.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            wishlist: newWishlist
        }
    })

})

const updateWishlist = catchAsync(async (req, res,next) => {
    const newWishlist = await Wishlist.findOneAndUpdate({ movieId: req.params.movieId }, req.body, {
        new: true,
        runValidators: true
    })

    if(!newWishlist){
        next(new AppError(`No wishlist found with the ID-${req.params.movieId}`,404))
    }
    res.status(201).json({
        status: 'success',
        data: {
            wishlist: newWishlist
        }
    })
})

const deleteWishlist = catchAsync(async (req, res,next) => {
    const deleteWishlist = await Wishlist.findOneAndDelete({ movieId: req.params.movieId })

    if(!deleteWishlist){
        next(new AppError(`No wishlist found with the ID-${req.params.movieId}`,404))
    }

    res.status(204).json({
        status: 'Success',
        data: deleteWishlist
    })
})

module.exports = {
    createWishlist,
    getAllWishlist,
    getWishlist,
    deleteWishlist
}