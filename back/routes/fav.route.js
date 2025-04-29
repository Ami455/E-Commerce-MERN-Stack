const router = require('express').Router();
const authMiddleware = require("../middleware/auth.middleware");
const { tryCatchWrapper } = require('../middleware/errorHandler.middleware');
const {
    findFavProducts,
    findFavProduct,
    addRemoveProductToFav,
    // deleteProductFromFav
} = require('../controllers/FavProduct.controller');

// Get all favorite products
router.get('/products', authMiddleware, tryCatchWrapper(findFavProducts));

// Check if a specific product is in favorites
router.get('/products/:id', authMiddleware, tryCatchWrapper(findFavProduct));

// Add a product to favorites
router.post('/products/:id', authMiddleware, tryCatchWrapper(addRemoveProductToFav));

// Delete a product from favorites
// router.delete('/products/:id', authMiddleware, tryCatchWrapper(deleteProductFromFav));

module.exports = router;
