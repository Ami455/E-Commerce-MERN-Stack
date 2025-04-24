const sequelize = require("../db/sql.db.config")
const {DataTypes} = require("sequelize")
const Role =require("../utils/role")
const User = sequelize.define("User", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(Role.ADMIN, Role.USER), // restrict values
        allowNull: false,
        defaultValue: Role.USER, // default value
      },      
    IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})


module.exports = User