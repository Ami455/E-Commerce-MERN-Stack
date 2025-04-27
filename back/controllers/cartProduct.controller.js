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

    if (!products) {
        res.status(200).json({ products, message: "Cart is empty" });
    }
    res.status(200).json({ products });
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
if (cartProduct) {
    // If product already exists, update the quantity
    cartProduct.quantity += quantity;
    await cartProduct.save();
} else{
    // If product doesn't exist in the cart, create a new entry in CartProduct table
    await CartProduct.create({ CartId, ProductId, quantity });
}
res.status(200).json({ message: 'Product added to cart' });
};


const updateProductQuantity = async (req, res) => {
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
if (cartProduct) {
    // If product already exists, update the quantity
    
    if(quantity<=0){
        await cartProduct.destroy();
    return res.status(200).json({ message: 'Product removed from cart' });
    }
    cartProduct.quantity = quantity;
    await cartProduct.save();
} else{
    // If product doesn't exist in the cart, create a new entry in CartProduct table
    await CartProduct.create({ CartId, ProductId, quantity });
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
     addProductToCart,
    updateProductQuantity,
     deleteProductFromCart
};