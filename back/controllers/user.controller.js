const User = require('../models/user.model');

const findAllUsers = async(req, res) => {
    const users= await User.findAll()
    res.json(users)
    // console.log('all user')

}

const findUserById = async (req, res) => {
const user= await User.findByPk(req.params.id)
res.json(user)
}

const createUser = async (req, res) => {
    const data = req.body
    const user = await User.create(data)
 await user.createCart()
 await user.createFav()
    res.json({user })
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
const isActiveUser = async (req, res) => {
const user_id = req.params.id
const user = await User.update({isActive:false}, {
    where: {
        id: req.params.id
    }
})
}

const adminDashboard= async (req, res) => {

    res.status(200).json({isAdmin: true});
}


module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,

    isActiveUser,

    adminDashboard
}