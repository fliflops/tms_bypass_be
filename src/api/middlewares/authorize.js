const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const {jwtSecret, redis} = require('../../config')

module.exports = async (req,res,next) => {
    const err = {
        message:'Invalid Access!',
        status: httpStatus.UNAUTHORIZED,
        isPublic: true
    };

    try{
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json(err)
        }

        jwt.verify(token, jwtSecret, async(error, result) => {
            if(error) {
                return res.status(401).json(err)
            }
            const session = await redis.json.get(`tms:session:${token}`);
            if(!session){
                await redis.del(`tms:session:${token}`)
                
                return res.status(401).json(err)
            }
            req.processor = {
                id: session.id                
            }
            return next()
        }) 
    }
    catch(e){
        next(e)
    }
}