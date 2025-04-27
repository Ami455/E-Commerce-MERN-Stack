const Cart = require('../models/Cart.model');
const  Product  = require('../models/Products.model');
const  CartProduct  = require('../models//CartProduct.model');

const findCartProducts = async (req, res) => {
    
    const cart = await Cart.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    const CartId=cart.id

    const products = await cart.getProducts({
        joinTableAttributes: ['quantity'] // includes quantity from CartProduct
    });
// const quantities = await CartProduct.findAll({where: {
//     CartId
// }})

    if (!products) {
        res.status(200).json({ products, message: "Cart is empty" });
    }
    let totalPrice = 0;
    products.forEach((product) => {
        totalPrice += product.CartProduct.quantity * product.price;
        //console.log(product.CartProduct.quantity, "*", product.price, totalPrice)
      });
    
      res.status(200).json({ products, totalPrice });
};

//check if product is in cart
const findProductQuantity= async (req, res) => {
    const ProductId = req.params.id
    const cart = await Cart.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    const CartId=cart.id

    const product = await cart.getProduct({
        where:{ProductId},
        joinTableAttributes: ['quantity'] // includes quantity from CartProduct
    });
if(!product)
{
    res.status(200).json({ quantity:0 }); 
}
      res.status(200).json({quantity: product.CartProduct.quantity });
};


const addProductToCart = async (req, res) => {
    
    const {quantity}= req.body
    const ProductId= req.params.id
    const cart = await Cart.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    const CartId=cart.id

    const product = await Product.findByPk(ProductId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
const cartProduct = await CartProduct.findOne({ where: { CartId, ProductId}} )
//quantity cant be more than stock or less than 1
const finalQuantity = Math.min(Math.max(quantity, 1), product.stock);

if (cartProduct) {
    // If product already exists, update the quantity
    
    cartProduct.quantity += finalQuantity;
    //quantity can't be more than stock
    if(cartProduct.quantity>product.stock)
    {cartProduct.quantity=product.stock}
    await cartProduct.save();
} else{
    // If product doesn't exist in the cart, create a new entry in CartProduct table
    await CartProduct.create({ CartId, ProductId, finalQuantity });
}

res.status(200).json({ message: 'Product added to cart' });
};


const updateProductQuantity = async (req, res) => {
    console.log(req.body)

    const {quantity}= req.body
    const ProductId= req.params.id
    const cart = await Cart.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    const CartId=cart.id

    const product = await Product.findByPk(ProductId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    const finalQuantity = Math.min(Math.max(quantity, 1), product.stock);

const cartProduct = await CartProduct.findOne({ where: { CartId, ProductId}} )
if (cartProduct) {
    //If product already exists, update the quantity
    
    if(quantity<=0){
        await cartProduct.destroy();
    return res.status(200).json({ message: 'Product removed from cart' });
    }
    cartProduct.quantity = finalQuantity;
    
    await cartProduct.save();
} else{
    // If product doesn't exist in the cart, create a new entry in CartProduct table
    await CartProduct.create({ CartId, ProductId, finalQuantity });
}
res.status(200).json({ message: 'Product added to cart' });
};


const deleteProductFromCart = async (req, res) => {
    const ProductId= req.params.id
    const cart = await Cart.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    const CartId=cart.id

    const product = await Product.findByPk(ProductId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
const cartProduct = await CartProduct.findOne({ where: { CartId, ProductId}} )
if (!cartProduct) {
    // If product doesnt exist
    return res.status(404).json({ error: 'Product is not in the cart' });

} 
    
const deleted = await CartProduct.destroy({
    where: {
        CartId,
        ProductId
    }
});

if (deleted) {
    return res.status(200).json({ message: 'Product removed from cart' });
} else {
    return res.status(404).json({ error: 'Product not found in cart' });
}

};




module.exports = {
   findCartProducts,
   findProductQuantity,
     addProductToCart,
    updateProductQuantity,
     deleteProductFromCart
};