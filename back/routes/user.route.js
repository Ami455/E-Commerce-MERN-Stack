const router = require('express').Router()
const authMiddleware = require("../middleware/auth.middleware")
const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
const {findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser} = require('../controllers/user.controller')


router.get('/', tryCatchWrapper(findAllUsers))
router.get('/:id',/*authMiddleware,*/ tryCatchWrapper(findUserById))
router.post('/',/*authMiddleware,*/ tryCatchWrapper(createUser))
router.put('/:id',/*authMiddleware,*/ tryCatchWrapper (updateUser))
router.delete('/:id',/*authMiddleware,*/ tryCatchWrapper( deleteUser))

module.exports = router