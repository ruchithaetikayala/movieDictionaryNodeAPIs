const express = require('express');
const router = express.Router();
const {createWishlist,getAllWishlist,getWishlist,deleteWishlist} = require('../controller/wishlistController')

router.route('/wishlist')
.get(getAllWishlist)
.post(createWishlist)

router.route('/wishlist/:movieId')
  .get(getWishlist)
  .delete(deleteWishlist)

/*Health check*/
router.get('/info', function(req, res, next) {
  res.json({
    service: 'Movie Dictionary',
    version: '1.0.0',
    health: 'green',
  })
});


module.exports = router;
