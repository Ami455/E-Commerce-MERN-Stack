const router = require('express').Router()
const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')
const {findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser} = require('../controllers/user.controller')


router.get('/', tryCatchWrapper(findAllUsers))
router.get('/:id', tryCatchWrapper(findUserById))
router.post('/', tryCatchWrapper(createUser))
router.put('/:id', tryCatchWrapper (updateUser))
router.delete('/:id',tryCatchWrapper( deleteUser))

module.exports = router