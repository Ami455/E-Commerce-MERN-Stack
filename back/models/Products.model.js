const sequelize = require("../db/sql.db.config")
const { DataTypes } = require("sequelize")

const Product = sequelize.define("Product", {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    availableColors: {
        type: DataTypes.JSON, // Use JSON to store an array of colors
        allowNull: true,
    }, 
    price: {
        type: DataTypes.DECIMAL, // Specify precision and scale
        allowNull: false,
    },
    image: { 
    
        type: DataTypes.STRING, // To store the image URL
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


module.exports = Product