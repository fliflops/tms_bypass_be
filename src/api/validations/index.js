const {userSchema} = require('./user.schema');
const {uploadTripSchema} = require('./trip.schema');

module.exports = {
    'user': userSchema,
    'trip-upload': uploadTripSchema
}