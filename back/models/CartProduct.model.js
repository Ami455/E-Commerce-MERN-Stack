const sequalize= require("../db/sql.db.config")
const { DataTypes } = require("sequelize")

const CartProduct=sequalize.define('CartProduct',{


  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  }
})
module.exports = CartProduct


