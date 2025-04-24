const Product = require("../models/Products.model")
const Category = require("../models/Category.model")

const associations=()=>{

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
}

module.exports = associations