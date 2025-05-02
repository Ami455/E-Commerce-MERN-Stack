const router = require('express').Router()
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")
const Role=require("../utils/role")

const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
const {findAllUsers,
    findUserById,
    createUser,
    updateUser,
    isActiveUser,
    adminDashboard} = require('../controllers/user.controller')


router.get('/',authMiddleware,roleMiddleware(Role.ADMIN), tryCatchWrapper(findAllUsers))
router.get('/:id',authMiddleware, tryCatchWrapper(findUserById))
router.post('/',authMiddleware,roleMiddleware(Role.ADMIN), tryCatchWrapper(createUser))
router.put('/:id',authMiddleware, tryCatchWrapper (updateUser))
router.put('/:id/active',authMiddleware,roleMiddleware(Role.ADMIN), tryCatchWrapper( isActiveUser))
router.get('/admin',authMiddleware,roleMiddleware(Role.ADMIN), tryCatchWrapper(adminDashboard))

module.exports = router