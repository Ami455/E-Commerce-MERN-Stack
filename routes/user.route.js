const router = require('express').Router()
const {findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser} = require('../controllers/user.controller')


router.get('/', findAllUsers)
router.get('/:id', findUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router