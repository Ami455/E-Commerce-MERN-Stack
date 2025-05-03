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
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true, // user might not add it initially
        validate: {
          is: /^[0-9\-+() ]+$/i, // only numbers, +, -, () allowed
        }
      },
      birthDate: {
        type: DataTypes.DATEONLY, // DATEONLY because you don't need time, only date
        allowNull: true
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