const {port,env} = require('./src/config');
const logger = require('./src/config/logger');
const app = require('./src/config/express');
const {redis} = require('./src/config');
const {workers} = require('./src/jobs');
const path = require('path');
const {db:{sequelize}} = require('./src/api/models');

const loaders = async() => {
    try{
        sequelize.authenticate().then(() => {
            logger.info('Connected to Test DB')
        })

        redis.on('error',(error) => console.error(`Error : ${error}`));
        await redis.connect();

        workers.tripConvertWorker();
        workers.tripUploadWorker();
        
    }
    catch(e){
        console.log(e)
    }
}

loaders();
app.listen(port, ()=> logger.info(`server started on port ${port} (${env})`));
global.appRoot = path.resolve(__dirname);

module.exports = app;