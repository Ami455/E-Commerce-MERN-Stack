const {login,register} = require('../controllers/auth.controller')
const router = require('express').Router()
const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')

router.post('/login',tryCatchWrapper(login))
router.post('/register',tryCatchWrapper(register))

module.exports = router