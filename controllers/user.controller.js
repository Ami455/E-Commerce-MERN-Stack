const User = require('../models/user.model');

const findAllUsers = async(req, res) => {
    const users= await User.findAll()
    res.json(users)
    // console.log('all user')

}

const findUserById = async (req, res) => {
const user= await User.findByPk(req.params.id)
}

const createUser = async (req, res) => {
    console.log('created')
    const data = req.body
    const user = await User.create(data)
    res.json(user)
}
const updateUser = async (req, res) => {
    const data = req.body
    const user = await User.update(data, {
        where: {
            id: req.params.id
        }
    })
    res.json(user)
}
const deleteUser = async (req, res) => {
const user_id = req.params.id
const user = await User.update({isActive:false}, {
    where: {
        id: req.params.id
    }
})
}


module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser
}