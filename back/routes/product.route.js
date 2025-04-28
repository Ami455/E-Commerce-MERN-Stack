    const router = require('express').Router()
    const roleMiddleware = require("../middleware/role.middleware")
    const Role=require("../utils/role")
    const uploads=require("../middleware/uploads.middleware")
    const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
    const { findAllProduct,
        findProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        findAllProductsInCategory,
        //findCategoryOfProductById,
        setProductCategory} = require('../controllers/product.controller')


    router.get('/',tryCatchWrapper(findAllProduct))
    router.get('/:id', tryCatchWrapper(findProductById))
    router.post('/', uploads.single("file") ,tryCatchWrapper(createProduct))
    router.put('/:id', tryCatchWrapper (updateProduct))
    router.delete('/:id', tryCatchWrapper( deleteProduct))


    router.get('/category', tryCatchWrapper(findAllProductsInCategory))
    //router.get('/:id/category', tryCatchWrapper(findCategoryOfProductById))
    router.put('/:id/category', tryCatchWrapper (setProductCategory))

    module.exports = router