const sequalize= require("../db/sql.db.config")
const { DataTypes } = require("sequelize")

const OrderProduct=sequalize.define('OrderProduct',{

  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  }
})
module.exports = OrderProduct

