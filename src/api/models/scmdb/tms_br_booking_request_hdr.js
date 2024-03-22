const {DataTypes,Model} = require('sequelize')

class tms_br_booking_request_hdr extends Model {
    static init(sequelize) {
        return super.init({
            br_request_Id:{
                primaryKey:true,
                type: DataTypes.STRING
            },
            br_status:{
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            tableName:'tms_br_booking_request_hdr',
            freezeTableName:true,
            timestamps:false
        })
    }
}

module.exports = tms_br_booking_request_hdr