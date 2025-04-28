const Order = require('../models/Order.model');
const Product = require('../models/Products.model');
const orderProduct = require('../models/OrderProduct.model');

const findOrderProducts = async (req, res) => {

    const order = await Order.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    const OrderId = order.id

    const products = await order.getProducts({
        joinTableAttributes: ['quantity'] // includes quantity from OrderProduct
    });


    if (!products) {
        res.status(200).json({ products, message: "Order is empty" });
    }

    let totalPrice = 0;
    products.forEach((product) => {
        totalPrice += product.OrderProduct.quantity * product.price;
        //console.log(product.OrderProduct.quantity, "*", product.price, totalPrice)
    });

    res.status(200).json({ products, totalPrice });
};


const addProductToOrder = async (req, res) => {

    const { quantity } = req.body
    const ProductId = req.params.id
    const order = await Order.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    const OrderId = order.id

    const product = await Product.findByPk(ProductId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const orderProduct = await OrderProduct.findOne({ where: { OrderId, ProductId } })

    //quantity cant be more than stock or less than 1
    const finalQuantity = Math.min(Math.max(quantity, 1), product.stock);

    if (orderProduct) {
        // If product already exists, update the quantity

        orderProduct.quantity += finalQuantity;
        //quantity can't be more than stock
        if (orderProduct.quantity > product.stock) { orderProduct.quantity = product.stock }
        await orderProduct.save();
    } else {
        // If product doesn't exist in the order, create a new entry in OrderProduct table
        await OrderProduct.create({ OrderId, ProductId, finalQuantity });
    }

    res.status(200).json({ message: 'Product added to order' });
};


const updateProductQuantity = async (req, res) => {


    const { quantity } = req.body
    const ProductId = req.params.id
    const order = await Order.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    const OrderId = order.id

    const product = await Product.findByPk(ProductId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const finalQuantity = Math.min(Math.max(quantity, 1), product.stock);

    const orderProduct = await OrderProduct.findOne({ where: { OrderId, ProductId } })
    if (orderProduct) {
        //If product already exists, update the quantity


        if (quantity <= 0) {
            await orderProduct.destroy();
            return res.status(200).json({ message: 'Product removed from order' });
        }

        orderProduct.quantity = finalQuantity;

        await orderProduct.save();
    } else {
        // If product doesn't exist in the order, create a new entry in OrderProduct table
        await OrderProduct.create({ OrderId, ProductId, finalQuantity });

    }
    res.status(200).json({ message: 'Product added to order' });
};


const deleteProductFromOrder = async (req, res) => {
    const ProductId = req.params.id
    const order = await Order.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    const OrderId = order.id

    const product = await Product.findByPk(ProductId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const orderProduct = await OrderProduct.findOne({ where: { OrderId, ProductId } })
    if (!orderProduct) {
        // If product doesnt exist
        return res.status(404).json({ error: 'Product is not in the order' });

    }

    const deleted = await OrderProduct.destroy({
        where: {
            OrderId,
            ProductId
        }
    });

    if (deleted) {
        return res.status(200).json({ message: 'Product removed from order' });
    } else {
        return res.status(404).json({ error: 'Product not found in order' });
    }

};




module.exports = {
    findOrderProducts,

    updateProductQuantity,

    addProductToOrder,

    deleteProductFromOrder
};