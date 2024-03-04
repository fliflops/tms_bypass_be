const router = require('express').Router();
const controller = require('../../controllers/trip.controller');
const multer = require('../../middlewares/multer');
const authorize = require('../../middlewares/authorize');
const bodyValidator = require('../../middlewares/body-validator.middleware');

router.route('/')
.put(multer.upload.single('file'),controller.uploadTrip)

router.route('/job')
.post(authorize,bodyValidator('trip-upload'),controller.createTripJob)
.get(controller.getPaginatedRawTrips)

router.route('/job/:jobId')
.get(authorize,controller.getRawTrip)
.post(authorize,controller.convertTripJob)

router.post('/kronos-template',controller.downloadKronosHandoffFile)



module.exports = router;