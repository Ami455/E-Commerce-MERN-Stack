const user = require('../models/user.model');

const findAllUsers = async(req, res) => {
    const users= await user.findAll()

}

const findUserById = async (req, res) => {
const user= await user.findByPk(req.params.id)
}
const createUser = async (req, res) => {
    const data = req.body
    const user = await user.create(data) 
}
const updateUser = async (req, res) => {
    const data = req.body
    const user = await user.update(data, {
        where: {
            id: req.params.id
        }
    })
}
const deleteUser = async (req, res) => {
const user_id = req.params.id
const user = await user.update({isActive:false}, {
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