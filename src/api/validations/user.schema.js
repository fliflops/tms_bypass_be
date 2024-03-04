const Joi = require('joi');

exports.userSchema = Joi.object({
    user_email: Joi.string().email().required(),
    user_password: Joi.string().required()
})