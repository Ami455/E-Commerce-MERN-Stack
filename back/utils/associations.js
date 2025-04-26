const Product = require("../models/Products.model")
const Category = require("../models/Category.model")
const Cart= require("../models/Cart.model")
const User =require("../models/user.model")

const associations=()=>{
//Category : Product   (1 to M)
Category.hasMany(Product,{
    foreignKey: "categoryId",
    onDelete: "CASCADE",
    as: "products",

})
Product.belongsTo(Category,{
    foreignKey: "categoryId",
    onDelete: "CASCADE",
    as: "category",
})


//User : Cart   (1 : 1)
User.hasOne(Cart, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "cart",
  });
  Cart.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "user",
  });


//Cart : Product   (M to M)
Cart.belongsToMany(Product,{
    through:"CartProduct"
})
Product.belongsToMany(Cart,{
    through:"CartProduct"
})
}

module.exports = associations