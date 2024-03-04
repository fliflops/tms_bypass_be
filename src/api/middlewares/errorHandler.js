const logger = require('../../config/logger');
const {env} = require('../../config');

const errorHandler = (err,req,res,next) => {
    console.log("Middleware Error Handling")
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || '';
    logger.error({
        status: errStatus,
        message: errMsg,
        request: req.originalUrl,
        stack: env === 'development' ? err : {} 
    })

    console.log(err)

    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: env === 'development' ? err.stack : {} 
    }) 

}

const validateReq = () => {

}

module.exports = {
    errorHandler, 
    validateReq
}

