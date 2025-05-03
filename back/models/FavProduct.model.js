const sequelize = require("../db/sql.db.config");
const { DataTypes } = require("sequelize");

const FavProduct = sequelize.define("FavProduct",{} , {
    timestamps: true, // createdAt و updatedAt 

});

module.exports = FavProduct;
