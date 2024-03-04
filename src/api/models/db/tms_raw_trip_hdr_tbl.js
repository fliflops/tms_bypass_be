const {Sequelize, Model, DataTypes} = require('sequelize');

class tms_raw_trip_hdr_tbl extends Model {
    static init(sequelize){
        return super.init({
            job_id:{
                primaryKey: true,
                allowNull:false,
                type: DataTypes.STRING(36)
            },
            upload_id:{
                type: DataTypes.STRING(36)
            },
            upload_status:{
                allowNull:false,
                type: DataTypes.STRING(10)
            },
            status:{
                type: DataTypes.STRING(10)
            },
            err_message:{
                type: DataTypes.STRING
            },
            file_path:{
                type: DataTypes.STRING
            },
            createdAt:  DataTypes.DATE,
            updatedAt:  DataTypes.DATE,
            created_by: DataTypes.STRING(36),
            updated_by: DataTypes.STRING(36)
        },
        {
            sequelize,
            tableName:'tms_raw_trip_hdr_tbl',
            freezeTableName:true
        })
    }

    static associate (models) {
        this.details = this.hasMany(models.tms_raw_trip_tbl,{
            foreignKey:'job_id',
            sourceKey:'job_id'  
        })
    }
}

module.exports = tms_raw_trip_hdr_tbl;