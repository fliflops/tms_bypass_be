const Sequelize = require('sequelize');
const {db} = require('../../../config');

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date=this._applyTimezone(date, options);
  
    //here means current timezone, _not_ UTC
    //return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
  };

const sequelize = new Sequelize({
    ...db
})

const models = {
    tms_user_tbl:               require('./tms_user_tbl').init(sequelize),
    tms_raw_trip_hdr_tbl:       require('./tms_raw_trip_hdr_tbl').init(sequelize),
    tms_raw_trip_tbl:           require('./tms_raw_trip_tbl').init(sequelize),
    tms_vehicle_type_mapping:   require('./tms_vehicle_type_mapping').init(sequelize),
    tms_trip_hdr_tbl:           require('./tms_trip_hdr_tbl').init(sequelize),
    tms_trip_dtl_tbl:           require('./tms_trip_dtl_tbl').init(sequelize),
    ship_point_master_tbl:      require('./ship_point_master_tbl').init(sequelize),
    location_master_tbl:        require('./location_master_tbl').init(sequelize),
    booking_request_dtl_tbl:    require('./booking_request_dtl_tbl').init(sequelize)
}

//associations
Object.values(models)
.filter(model => typeof model.associate === 'function')
.forEach(model => model.associate(models));

module.exports = {
    sequelize,
    Sequelize,
    ...models
}