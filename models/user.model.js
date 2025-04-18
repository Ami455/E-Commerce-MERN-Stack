const sequelize = require("../db/sql.db.config")
// import { isStrongPassword } from './../node_modules/@types/validator/index.d';
// import { min } from './../node_modules/moment/moment.d';
const {DataTypes} = require("sequelize")

const User = sequelize.define("User", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // validate: {
        //     isEmail: true
        // }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len: [6, 100], // Password must be at least 6 characters long
        //     isStrongPassword: {
        //         args: [{ minLength: 6, minUppercase: 1, minNumbers: 1, minSymbols: 1, minLowercase: 1 }],
        //         msg: "Password must contain at least one uppercase letter, one lowrcase letter, one number, and one special character."
        //     }
        // }
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})


module.exports = User