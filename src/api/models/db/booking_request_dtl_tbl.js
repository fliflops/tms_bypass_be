const {DataTypes,Model} = require('sequelize')

class booking_request_dtl_tbl extends Model {
    static init(sequelize) {
        return super.init({
            bookingRequestNo:{
                primaryKey:true,
                type: DataTypes.STRING
            },
            skuCode:{
                type: DataTypes.STRING
            },
            plannedQty:{
                type: DataTypes.DECIMAL
            },
            uom:{
                type: DataTypes.STRING
            },
            weight:{
                type: DataTypes.DECIMAL
            },
            weightUOM:{
                type: DataTypes.STRING
            },
            cbm:{
                type: DataTypes.DECIMAL
            },
            cbmUOM:{
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            tableName:'booking_request_dtl_tbl',
            freezeTableName:true,
            timestamps:false
        })
    }
}

module.exports = booking_request_dtl_tbl;