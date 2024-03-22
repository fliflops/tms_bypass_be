const Sequelize = require('sequelize');
const {scmdb} = require('../../config');
const tms_br_booking_request_hdr = require('./scmdb/tms_br_booking_request_hdr')

const sequelize = new Sequelize({
    ...scmdb
})

const models = {
    tms_br_booking_request_hdr: tms_br_booking_request_hdr.init(sequelize)
}


module.exports = {
    sequelize,
    Sequelize,
    ...models
}