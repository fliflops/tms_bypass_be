const {Sequelize, Model, DataTypes} = require('sequelize');

class tms_raw_trip_tbl extends Model {
    static init(sequelize) {
        return super.init({
            id:{
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4   
            },				 
            job_id:{
                allowNull:false,
                type: DataTypes.STRING
            },		 
            br_no:{
                //allowNull:false,
                type: DataTypes.STRING
            },			 
            invoice_no:{
                //allowNull:false,
                type: DataTypes.STRING
            },		 
            principal:{
                //allowNull:false,
                type: DataTypes.STRING
            },		 
            trip_no:{
                //allowNull:false,
                type: DataTypes.STRING
            },			 
            from_description:{
                //allowNull:false,
                type: DataTypes.STRING
            }, 
            from_location:{
                //allowNull:false,
                type: DataTypes.STRING
            },	 
            to_description:{
                //allowNull:false,
                type: DataTypes.STRING
            },   
            to_location:{
                //allowNull:false,
                type: DataTypes.STRING
            },		 
            vehicle_type:{
                //allowNull:false,
                type: DataTypes.STRING
            },	 
            volume:{
                //allowNull:false,
                type: DataTypes.DECIMAL
            },			 
            weight:{
                //allowNull:false,
                type: DataTypes.DECIMAL
            },			 
            sequence:{
               // allowNull:false,
                type: DataTypes.INTEGER
            },		 
            service_type:{
                //allowNull:false,
                type: DataTypes.STRING
            },	 
            location:{
                //allowNull:false,
                type: DataTypes.STRING
            },
            rdd:{
                type: DataTypes.DATE
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE 
        },
        {
            sequelize,
            tableName:'tms_raw_trip_tbl',
            freezeTableName:true
        })
    }

    static associate (models) {
        this.from = this.hasOne(models.ship_point_master_tbl,{
            foreignKey: 'shipPointId',
            sourceKey:'from_location',
            as: 'from_ship_point'
        })

        this.from = this.hasOne(models.ship_point_master_tbl,{
            foreignKey: 'shipPointId',
            sourceKey:'to_location',
            as: 'to_ship_point'
        })

        this.location = this.hasOne(models.location_master_tbl,{
            foreignKey:'locationCode',
            sourceKey:'location'
        })

        this.details = this.hasMany(models.booking_request_dtl_tbl,{
            foreignKey:'bookingRequestNo',
            sourceKey:'br_no'
        })
    }
}

module.exports = tms_raw_trip_tbl;