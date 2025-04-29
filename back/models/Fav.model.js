const sequelize = require("../db/sql.db.config")
const { DataTypes } = require("sequelize")

const Fav = sequelize.define("Fav",{} , {
    timestamps: true, // createdAt و updatedAt 
}
)

module.exports = Fav