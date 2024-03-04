const { Sequelize, DataTypes, Model } = require("sequelize");

class tms_user_tbl extends Model {
    static init(sequelize) {
        return super.init({
            id:{
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4   
            },
            user_email:{
                allowNull:false,
                type: DataTypes.STRING(255)
            },
            user_password:{
                allowNull:false,
                type: DataTypes.STRING(255)
            },
            is_active:{
                type: DataTypes.BOOLEAN
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            created_by: DataTypes.STRING(36),
            updated_by: DataTypes.STRING(36)
        },
        {
            sequelize,
            tableName:'tms_user_tbl',
            freezeTableName:true
        })
    }
}

module.exports = tms_user_tbl