const { Sequelize, DataTypes, Model } = require("sequelize");

class tms_vehicle_type_mapping extends Model {
    static init (sequelize) {
        return super.init({
            vehicle_type:{
                allowNull:false,
                primaryKey:true,
                type: DataTypes.STRING
            },
            default_vehicle_id:{
                allowNull:false,
                type: DataTypes.STRING
            },
            is_active:{
                allowNull:false,
                type: DataTypes.BOOLEAN
            },
            createdAt: DataTypes.DATE, 
            updatedAt: DataTypes.DATE, 
            created_by: {
                type: DataTypes.STRING
            },
            updated_by:{
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            tableName:'tms_vehicle_type_mapping'
        })
    }
}

module.exports = tms_vehicle_type_mapping