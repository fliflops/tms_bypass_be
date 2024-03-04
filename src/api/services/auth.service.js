const models = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config');
const {redis} = require('../../config');

exports.signIn = async({user_email, user_password}) => {
    const user = await models.tms_user_tbl.findOne({
        where:{
            user_email
        }
    })

    if(!user){
        throw Error('Invalid Username or Password')
    }

    if(!bcrypt.compareSync(user_password,user.user_password)){
        return Error('Invalid Username or Password')
    }

    const token = jwt.sign({user_id: user.id, user_email: user.user_email },
        jwtSecret,{
        expiresIn:'24h'
    })

    await redis.json.set(`tms:session:${token}`,'$',{
        id: user.id,
        user_email,
        token,
    })

    return {
        id: user.id,
        user_email,
        token,
    }
}

exports.signOut = async (token) => {
    await redis.del('tms:session:'+token)
}

exports.createUser = async (data) => {
    const user = await models.tms_user_tbl.findOne({
        where:{
            user_email: data.user_email
        }
    })

    if(user) throw Error('User already exists!');

    const hashedPassword = bcrypt.hashSync(data.user_password,10)
    
    return await models.tms_user_tbl.create({
        ...data,
        is_active: true,
        user_password: hashedPassword
    }).then(result => JSON.parse(JSON.stringify(result)))

}

exports.updateUser = async (data) => {
    
}

exports.getPaginatedUsers = async () => {

}

exports.getUser = async (filters) => {
    return await models.tms_user_tbl.findOne({
        where:{
            ...filters
        }
    })
}

