const {Sequelize, Model, DataTypes} = require('sequelize');

class tms_trip_dtl_tbl extends Model {
    static init (sequelize) {
        return super.init({
            id:{
                primaryKey:true,
                allowNull:false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4   
            },
            br_no:{
                type: DataTypes.STRING
            },
            trip_no:{
                type: DataTypes.STRING
            },
            invoice_no:{
                type: DataTypes.STRING
            },
            principal_code:DataTypes.STRING,
            service_type:DataTypes.STRING,
            volume: DataTypes.DECIMAL,
            weight: DataTypes.DECIMAL,
            location: DataTypes.STRING,
            rdd: DataTypes.DATEONLY,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            sequelize,
            tableName:'tms_trip_dtl_tbl',
            freezeTableName: true
        })
    }
}

module.exports = tms_trip_dtl_tbl 