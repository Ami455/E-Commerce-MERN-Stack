const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv').config

const generateToken =  (payload)=>{
    return jwt.sign(payload,process.env.JWT_SIGNING_KEY,{expiresIn:'1h'})
}

const verifyToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SIGNING_KEY)
}

module.exports= {generateToken,verifyToken}