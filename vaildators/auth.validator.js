const joi = require ('joi')

const registerSchema = joi.object({
    userName : joi.string().required(),
    email: joi.string().email().required(),
    password:joi.string().min(6).max(20).required(),
})

module.exports= {registerSchema}