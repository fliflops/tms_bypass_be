const path = require('path');
const redis = require('./redis/redis');
const ioredis = require('./redis/ioredis');

require('dotenv').config({
    path: path.join(__dirname, '../../.env')
})

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    // jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    // jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    // jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    // emailConfig: {
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     username: process.env.EMAIL_USERNAME,
    //     password: process.env.EMAIL_PASSWORD,
    // },
    // redis: {
    //     port: process.env.REDIS_PORT,
    //     host: process.env.REDIS_URL,
    //     //expire: process.env.REDIS_SESSION_EXPIRE
    // },
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: 'mssql',
        pool:{
            max: 10,
            min: 1,
            idle: 2000000,
            acquire: 2000000
        },
        logging: process.env.NODE_ENV === 'development',
        dialectOptions : {
            options:{
                requestTimeout: 3600000
            }
        },
        pool: { 
            max: 1000000,
            min: 0,
            idle: 2000000,
            acquire: 2000000,
            idleTimeoutMillis: 50,
            evictionRunIntervalMillis: 5,
            softIdleTimeoutMillis: 5,
            logging: false
        },
        timezone: '+08:00' /**for writing to database**/
    },
    redis,
    ioredis
}