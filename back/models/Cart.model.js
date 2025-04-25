const sequelize = require("../db/sql.db.config")
const { DataTypes } = require("sequelize")

const Cart = sequelize.define("Cart", {

    totalPrice: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set the current date
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set the current date
    }
}, {
    // Additional model options
    timestamps: true, // Automatically manage createdAt and updatedAt
}
)


module.exports = Cart