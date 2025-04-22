const User = require('../models/user.model')
const {hashPassword,comparePassword} = require('../utils/hashingPassword')
const {registerSchema} = require('../vaildators/auth.validator')
const {generateToken}=require('../utils/jwt')



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

    const token = generateToken({id:user.id,email:user.email})

    return res.status(201).json({
        message: "logged in successfully",
        token,
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

    const token = generateToken({id:newUser.id,email:newUser.email})

    return res.status(201).json({
        message: "registered successfully",
        token,
    });

}

module.exports={login,register}