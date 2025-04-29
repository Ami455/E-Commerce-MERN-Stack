const Product = require("../models/Products.model")
const Category = require("../models/Category.model")
const Cart= require("../models/Cart.model")
const User =require("../models/user.model")
const Address =require("../models/address.model")
const Order =require("../models/Order.model")
const Review = require("../models/review.model")

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

//User : Address   (1 to M)
User.hasMany(Address,{
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "addresses",

})
Address.belongsTo(User,{
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "user",
})
//User : Order   (1 to M)
User.hasMany(Order,{
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "orders",

})
Order.belongsTo(User,{
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "user",
})

//User : Review   (1 to M)
User.hasMany(Review, { 
    foreignKey: 'userId',
    onDelete: "CASCADE",
    as: "review",
 });
Review.belongsTo(User, { 
    foreignKey: 'userId',
    onDelete: "CASCADE",
    as: "user",
 });
//Product : Review   (1 to M)
Product.hasMany(Review, { 
    foreignKey: 'productId',
    onDelete: "CASCADE",
    as: "review",
 });
Review.belongsTo(Product, { 
    foreignKey: 'productId',
    onDelete: "CASCADE",
    as: "product", });

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

  //Order : Address   (1 : 1)
Order.hasOne(Address, {
    foreignKey: "orderId",
    onDelete: "CASCADE",
    as: "address",
  });
  Address.belongsTo(Order, {
    foreignKey: "orderId",
    onDelete: "CASCADE",
    as: "order",
  });


//Cart : Product   (M to M)
Cart.belongsToMany(Product,{
    through:"CartProduct"
})
Product.belongsToMany(Cart,{
    through:"CartProduct"
})
//Order : Product   (M to M)
Order.belongsToMany(Product,{
    through:"OrderProduct"
})
Product.belongsToMany(Order,{
    through:"OrderProduct"
})
}

module.exports = associations

