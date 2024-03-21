const {Worker} = require('bullmq');
const {ioredis} = require('../../config');
const tripService = require('../../../src/api/services/trip.service');
const models = require('../../api/models').db

module.exports = async () => {
    const worker = new Worker('tms:job:convert_trip',
    async(job) => {
        const stx = models.sequelize.transaction();
        try{
            //update upload status to inprogress
            await tripService.updateTripRaw({
                status:'INPROGRESS',
                updated_by: job.data.user
            },
            {
                upload_id: job.id
            })

            const tripDetails = await models.tms_trip_dtl_tbl.findAll({
                where:{
                    br_no: job.data.data.map(item => item.br_no)
                }
            })

            if(tripDetails.length > 0){
                throw Error('BR already exists!')
            }

            const converted = await tripService.tripConvert(job.data.data);

            await tripService.createTrip(converted.tms_trips.map(item => {
                return {
                    ...item,
                    created_by: job.data.user,
                    details: item.details.map(({principal,...dtl}) => ({
                        ...dtl,
                        principal_code: principal
                    }))
                }
            }));

            return converted

        }
        catch(e){
            console.log(e)
            throw e
        }
    },
    {
        autorun: false,
        connection: ioredis
    })

    worker.on('completed', async(job, returnValue) => {
        console.log(`${job.id}} is completed`)
        models.tms_raw_trip_hdr_tbl.update({
            status:'COMPLETED',
            file_path: returnValue.filePath
        },
        {
            where:{
                upload_id: job.id
            }
        })
    })

    worker.on('error',async(err) => {
        console.log('Error',err)
    })

    worker.on('failed', async(job, error) => {
       
        models.tms_raw_trip_hdr_tbl.update({
            status:'FAILED',
            err_message:error?.message ?? error?.name
        },
        {
            where:{
                upload_id: job.id
            }
        })
    })

    worker.run();
}