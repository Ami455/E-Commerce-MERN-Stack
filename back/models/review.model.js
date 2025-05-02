const sequelize = require("../db/sql.db.config")
const { DataTypes } = require("sequelize")


const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
        
    }
}, {
    // Additional model options
    timestamps: true, // Automatically manage createdAt and updatedAt
}
)
module.exports = Review
