const {login,register,admin,getMe} = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = require('express').Router()
const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.post('/login',tryCatchWrapper(login))
router.post('/register',tryCatchWrapper(register))
router.get('/me',authMiddleware,tryCatchWrapper(getMe))
// router.get('/admin',authMiddleware,roleMiddleware('admin'),tryCatchWrapper(admin))

module.exports = router