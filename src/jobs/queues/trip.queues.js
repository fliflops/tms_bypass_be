const {Queue} = require('bullmq');
const {ioredis} = require('../../config');

exports.convertTripQueue = new Queue('tms:job:convert_trip', {connection: ioredis});
exports.uploadTripQueue = new Queue('tms:job:upload_trip', {connection: ioredis})