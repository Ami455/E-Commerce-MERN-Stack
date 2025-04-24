const router = require('express').Router()
const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
const { findAllCategory,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    findCategoriesWithProducts,
    findCategoryByIdWithProducts,
    addProductToCategory} = require('../controllers/category.controller')


router.get('/', tryCatchWrapper(findAllCategory))
router.get('/:id', tryCatchWrapper(findCategoryById))
router.post('/', tryCatchWrapper(createCategory))
router.put('/:id', tryCatchWrapper (updateCategory))
router.delete('/:id', tryCatchWrapper( deleteCategory))

router.get('/products', tryCatchWrapper(findCategoriesWithProducts))
router.get('/:id/products', tryCatchWrapper(findCategoryByIdWithProducts))
router.put('/:id/products', tryCatchWrapper(addProductToCategory))

module.exports = router