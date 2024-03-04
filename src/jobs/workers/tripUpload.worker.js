const models = require('../../api/models').db
const {ioredis} = require('../../config');
const {Worker} = require('bullmq');
const tripService = require('../../../src/api/services/trip.service');

module.exports = async() => {
    const worker = new Worker('tms:job:upload_trip', 
    async(job) => {
        const uploadId = await tripService.createTripDetailsRaw(job.id, job.data); 
        await job.updateProgress(100)
        return uploadId
    },
    {
        autorun:false,
        connection: ioredis
    })

    worker.on('completed', async(job, returnValue) => {
        console.log(`${job.id}} is completed`)
        models.tms_raw_trip_hdr_tbl.update({
            upload_status:'COMPLETED',
            status:'DRAFT',
            upload_id: returnValue
        },
        {
            where:{
                job_id: job.id
            }
        })
    })

    worker.on('error',async(err) => {
        console.log('Error',err)
    })

    worker.on('failed', async(job, error) => {
        console.log('Failed',error.message || error.name)

        models.tms_raw_trip_hdr_tbl.update({
            upload_status:'FAILED',
            status:null,
            err_message:error.name || error.message
        },
        {
            where:{
                job_id: job.id
            }
        })
    })

    worker.run();
}