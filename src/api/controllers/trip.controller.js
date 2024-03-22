const tripService = require('../services/trip.service');
const {queues} = require('../../jobs');
const {v4:uuid} = require('uuid');
const moment = require('moment');
const models = require('../models').db;

exports.uploadTrip = async(req,res,next) => {
    try{
        const data = await tripService.tripUpload(req.file);
        res.status(200).json(data);
    }
    catch(e){
        next(e)
    }
}

exports.createTripJob = async(req,res,next) => {
    try {
        const data = req.body;
        const jobId = uuid();
       
        await tripService.createTripRaw(jobId,req.processor.id);
        await queues.tripQueues.uploadTripQueue.add(`trip:upload:${req.processor.id}-${moment().format('YYYYMMDD_HHMMSS')}`,data,
        {
            jobId: jobId,
            //removeOnFail:true
        })

        res.status(200).json(jobId);
    }
    catch(e){
        next(e)
    }
}

exports.convertTripJob = async(req,res,next) => {
    try{
        const {jobId} = req.params;
        const data = await tripService.getRawTrip({
            job_id: jobId
        })

        if(!data){
            return res.status(400).json({
                message:'Invalid Job Id'
            })
        }

        if(data.status !=='DRAFT'){
            return res.status(400).json({
                message:'Invalid job status'
            })
        }

        await queues.tripQueues.convertTripQueue.add(`trip:convert:${req.processor.id}-${moment().format('YYYYMMDD_HHMMSS')}`,{
            data: data.tms_raw_trip_tbls,
            user: req.processor.id
        },{
            jobId: data.upload_id,
            //removeOnFail:true
        })

        res.status(200).json();
    }
    catch(e){
        next(e)
    }
}

exports.getPaginatedRawTrips = async(req,res,next) => {
    try{
        const data = await tripService.getPaginatedRawTrips(req.query)

        res.status(200).json({
            data: data.rows,
            rows:data.count,
            pageCount: data.pageCount
        })

    }
    catch(e){

    }
}

exports.getRawTrip = async(req,res,next) => {
    try{
        const {jobId} = req.params

        const data = await tripService.getRawTrip({
            job_id: jobId
        })

        res.status(200).json(data)
    }
    catch(e){

    }
}

exports.downloadKronosHandoffFile = async(req,res,next) => {
    try{
        const {filePath} = req.body;
        
        res.download(filePath)
    }   
    catch(e){
        next(e)
    }
}
