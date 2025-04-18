const bycrpt = require('bcrypt');

const hashPassword = async (password)=>{
    return await bycrpt.hash(password,10)
}

const comparePassword = async (password,hashPasswordDB)=>{
    return await bycrpt.compare(password,hashPasswordDB)
}

module.exports={hashPassword,comparePassword}