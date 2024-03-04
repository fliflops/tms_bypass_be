const {Sequelize, Model, DataTypes} = require('sequelize');

class location_master_tbl extends Model {
    static init(sequelize) {
        return super.init({
            locationCode:{
                primaryKey: true,
                type: DataTypes.STRING
            },
            locationDescription:{
                type: DataTypes.STRING
            },
            address:{
                type: DataTypes.STRING
            },
            city:{
                type: DataTypes.STRING
            },
            status:{
                type: DataTypes.STRING
            },
        },
        {
            sequelize,
            tableName: 'location_master_tbl',
            freezeTableName: true,
            timestamps: false
        })
    }
}

module.exports = location_master_tbl