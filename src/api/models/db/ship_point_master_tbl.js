const { Sequelize, Model, DataTypes } = require('sequelize');

class ship_point_master_tbl extends Model {
    static init(sequelize) {
        return super.init({
            shipPointId:{
                primaryKey:true,
                type: DataTypes.STRING
            },
            shipPointDesc:{
                type: DataTypes.STRING
            },
            shipPointAddress:{
                type: DataTypes.STRING
            },
            city:{
                type: DataTypes.STRING
            },
            state:{
                type: DataTypes.STRING
            },
            country:{
                type: DataTypes.STRING
            },
            shipPtZone:{
                type: DataTypes.STRING
            },
            postalCode:{
                type: DataTypes.STRING
            },
            status:{
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            tableName: 'ship_point_master_tbl',
            freezeTableName: true,
            timestamps: false
        })
    }
}

module.exports = ship_point_master_tbl;