const router = require('express').Router()
const authMiddleware = require("../middleware/auth.middleware")

const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
const { findAllOrders,
    findOrderDetails,
    addProductToOrder,
    deleteProductFromOrder,
    
} = require('../controllers/orderProduct.controller')
const { checkout } = require('../controllers/checkout.controller')
const { updateOrderStatus } = require('../controllers/order.controller')


router.get('/',authMiddleware, tryCatchWrapper(findAllOrders))
 router.get('/:id',authMiddleware, tryCatchWrapper(findOrderDetails))
 router.post('/:id',authMiddleware, tryCatchWrapper(updateOrderStatus))
 router.post('/:orderId/product/:productId',authMiddleware, tryCatchWrapper(addProductToOrder))
 router.delete('/:orderId/product/:productId',authMiddleware, tryCatchWrapper( deleteProductFromOrder))
 
 router.post('/checkout',authMiddleware, tryCatchWrapper(checkout))

module.exports = router