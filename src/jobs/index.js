const tripConvertWorker = require('./workers/tripConvert.worker');
const tripUploadWorker = require('./workers/tripUpload.worker')
const tripQueues = require('./queues/trip.queues');



module.exports = {
    queues: {
        tripQueues
    },
    workers:{
        tripConvertWorker,
        tripUploadWorker
    }
}

