const router = require('express').Router()
const authMiddleware = require("../middleware/auth.middleware")

const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
const { findCartProducts,
    addProductToCart,
    updateProductQuantity,
     deleteProductFromCart
} = require('../controllers/cartProduct.controller')


router.get('/products',authMiddleware, tryCatchWrapper(findCartProducts))
 router.post('/products/:id',authMiddleware, tryCatchWrapper(addProductToCart))
 router.put('/products/:id',authMiddleware, tryCatchWrapper (updateProductQuantity))
router.delete('/products/:id',authMiddleware, tryCatchWrapper( deleteProductFromCart))


module.exports = router