const authService = require('../services/auth.service');

exports.logIn = async(req,res,next) => {
    try{

        const data = req.body

        const user = await authService.signIn({...data})

        res.status(200).json(user)
    }
    catch(e){
        next(e)
    }
}

exports.createUser = async (req,res,next) => {
    try{
        const data = req.body;

        const user = await authService.createUser(data);
        res.status(200).json(user)
    }
    catch(e){
        next(e)
    }
}

exports.logOut = async (req,res,next) => {
    try{
        const token =  req.headers['x-access-token'];
        if(token) {
            await authService.signOut(token)
        }
        res.end();
    }
    catch(e){
        next(e)
    }
}