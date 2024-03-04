const {Sequelize, Model, DataTypes} = require('sequelize');

class tms_trip_hdr_tbl extends Model {
    static init (sequelize){
        return super.init({
            trip_no:{
                primaryKey: true,
                type: DataTypes.STRING
            },
            from_location:{
                type: DataTypes.STRING
            },
            to_location:{
                type: DataTypes.STRING
            },
            vehicle_type:{
                type: DataTypes.STRING
            },
            service_type:{
                type: DataTypes.STRING
            },
            vehicle_id:{
                type: DataTypes.STRING
            },
            location:{
                type: DataTypes.STRING
            },
            job_id:{
                type: DataTypes.STRING
            },
            createdAt: DataTypes.DATE,	
            updatedAt: DataTypes.DATE,	
            created_by:{
                type: DataTypes.STRING
            },
            updated_by:{
                type: DataTypes.STRING
            }  
        },
        {
            sequelize,   
            tableName:'tms_trip_hdr_tbl',
            freezeTableName: true
        })
    }

    static associate (models) {
        this.details = this.hasMany(models.tms_trip_dtl_tbl,{
            foreignKey:'trip_no',
            sourceKey:'trip_no',
            as:'details'
        })
    }
}

module.exports = tms_trip_hdr_tbl