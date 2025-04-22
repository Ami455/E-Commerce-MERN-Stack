const sequelize = require("../db/sql.db.config")
const { DataTypes } = require("sequelize")

const Product = sequelize.define("Product", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,

    }
})


module.exports = Product