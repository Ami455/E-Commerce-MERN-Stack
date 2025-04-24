const router = require('express').Router()
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")
const Role=require("../utils/role")

const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
const {findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser} = require('../controllers/user.controller')


router.get('/',/*authMiddleware,roleMiddleware(Role.ADMIN),*/ tryCatchWrapper(findAllUsers))
router.get('/:id',/*authMiddleware,roleMiddleware(Role.ADMIN),*/ tryCatchWrapper(findUserById))
router.post('/',/*authMiddleware,roleMiddleware(Role.ADMIN),*/ tryCatchWrapper(createUser))
router.put('/:id',/*authMiddleware,roleMiddleware(Role.ADMIN),*/ tryCatchWrapper (updateUser))
router.delete('/:id',/*authMiddleware,roleMiddleware(Role.ADMIN),*/ tryCatchWrapper( deleteUser))

module.exports = router