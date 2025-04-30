const User = require('../models/user.model');
const { hashPassword } = require('../utils/hashingPassword');

const findAllUsers = async(req, res) => {
    const users= await User.findAll()
    res.json(users)
}

const findUserById = async (req, res) => {
    const user= await User.findByPk(req.params.id)
    res.json(user)
}

const createUser = async (req, res) => {

    const data = req.body
    const hashedPassword = await hashPassword(data.password);
    const user = await User.create({ ...data, password: hashedPassword });

    await user.createCart()
    await user.createFav()

    res.json({user })
}

const updateUser = async (req, res) => {

    const data = req.body;

    if (data.password) {
        data.password = await hashPassword(data.password);
    }

    await User.update(data, {
        where: {
            id: req.params.id
        }
    });

    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);

};

const isActiveUser = async (req, res) => {

    await User.update({ IsActive: false }, {
        where: {
            id: req.params.id
        }
    });
    res.json({ message: `User ${req.params.id} deactivated.` });

};

const adminDashboard = async (req, res) => {
    res.status(200).json({isAdmin: true});
};

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    isActiveUser,
    adminDashboard
};
