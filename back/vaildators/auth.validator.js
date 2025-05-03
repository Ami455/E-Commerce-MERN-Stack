const joi = require ('joi')

const registerSchema = joi.object({
    userName : joi.string().required(),
    email: joi.string().email().required(),
    password:joi.string().min(6).max(20).required(),
    role: joi.string().valid('admin', 'user').default("user").optional(),
    phoneNumber: joi.string()
    .pattern(/^[0-9\-+() ]+$/)
    .message('Phone number must contain only digits, +, -, or parentheses')
    .optional(),
  birthDate: joi.date()
    .less('now')
    .iso()
    .messages({
      'date.less': 'Birth date must be in the past',
      'date.format': 'Birth date must be in ISO format (YYYY-MM-DD)'
    })
    .optional()

})

module.exports= {registerSchema}