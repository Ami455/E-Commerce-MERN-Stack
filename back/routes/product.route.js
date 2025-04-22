    const router = require('express').Router()
    const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
    const { findAllProduct,
        findProductById,
        createProduct,
        updateProduct,
        deleteProduct} = require('../controllers/product.controller')


    router.get('/', tryCatchWrapper(findAllProduct))
    router.get('/:id', tryCatchWrapper(findProductById))
    router.post('/', tryCatchWrapper(createProduct))
    router.put('/:id', tryCatchWrapper (updateProduct))
    router.delete('/:id', tryCatchWrapper( deleteProduct))

    module.exports = router