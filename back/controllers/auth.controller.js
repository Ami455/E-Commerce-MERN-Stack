const User = require('../models/user.model')
const {hashPassword,comparePassword} = require('../utils/hashingPassword')
const {registerSchema} = require('../vaildators/auth.validator')
const {generateToken}=require('../utils/jwt')
// const { verifyToken } = require('../utils/jwt');


const login = async (req,res)=>{
    const {email,password} = req.body
    const  user = await User.findOne({where:{email}})
    if (!user) {
        return res.status(404).json({
            message: "User not found, please register",
        });
    }
    
    const isMatchPassword = await comparePassword(password, user.password)

    if (!isMatchPassword) {
        return res.status(404).json({
            message: "invalid credentials",
        });
    }

    const token = generateToken({id:user.id,email:user.email,role: user.role})

    return res.status(201).json({
        message: "logged in successfully",
        token,
        user:{role:user.role, id: user.id}
    });
}

const register = async (req,res)=>{
    const {error,value}=registerSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    const user = await User.findOne({where:{email:value.email}})

    if (user){
        return res.status(400).json({
        message: "User already exists",
        });
    }

    const hashedPassword = await hashPassword(value.password)

    const newUser = await User.create({...value,password:hashedPassword})
    await newUser.createCart()
    await newUser.createFav()
    
    const token = generateToken({id:newUser.id,email:newUser.email, role: newUser.role})

    return res.status(201).json({
        message: "registered successfully",
        token,
    });

}

const admin = async (req,res)=>{
    const data =req.user
    const role = data.role
    // console.log(data.role)
    console.log(role)

    res.json({role, message: 'Welcome to the admin panel!'})
}


const getMe = async (req,res)=>{
    const user = await User.findByPk(req.user.id)
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    return res.status(200).json({
        message: "User found",
        user,
    });
}

module.exports={login,register,admin,getMe}