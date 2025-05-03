const sequelize = require("../db/sql.db.config")
const { DataTypes } = require("sequelize")
const {OrderStatus,PaymentMethod} = require("../utils/orderEnums")
const Order = sequelize.define("Order", {

   totalPrice : {
        type: DataTypes.DECIMAL(15,3),
        
        allowNull: false,
        defaultValue:0
      },
      status: {
        type: DataTypes.ENUM(
          OrderStatus.PENDING,
          OrderStatus.PROCESSING,
          OrderStatus.SHIPPED,
          OrderStatus.DELIVERED,
          OrderStatus.CANCELLED
        ),
        defaultValue: OrderStatus.PENDING
      },
      paymentMethod: {
        type: DataTypes.ENUM(
          PaymentMethod.CREDIT_CARD,
          PaymentMethod.PAYPAL,
          PaymentMethod.CASH_ON_DELIVERY
        ),
        defaultValue:PaymentMethod.CASH_ON_DELIVERY,
        allowNull: false
      }
}, {
    // Additional model options
    timestamps: true, // Automatically manage createdAt and updatedAt
}
)


module.exports = Order


