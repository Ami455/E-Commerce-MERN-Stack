const sequelize = require("../db/sql.db.config")
const { DataTypes } = require("sequelize")

const Category = sequelize.define("Category", {

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
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


module.exports = Category