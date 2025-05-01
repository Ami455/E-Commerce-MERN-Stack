const Order = require('../models/Order.model');
const Product = require('../models/Products.model');
const OrderProduct = require('../models/OrderProduct.model');
const Address = require('../models/address.model');
const User = require('../models/user.model');

const findAllOrders = async (req, res) => {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          through: { attributes: ["quantity"] }
        },
        {
          model: Address,
          as: "address"
        },
        {
          model: User,
          as: "user"
        }
      ]
    });

    res.status(200).json(orders);
}


const findAllOrdersAdmin = async (req, res) => {
    const orders = await Order.findAll({
        include: [
            {
                model: Product,
                through: { attributes: ["quantity"] }
            },
            {
                model: Address,
                as: "address"
            },
            {
                model: User,
                as: "user"
            }
        ]
    });
    res.status(200).json(orders);
}

const findOrderDetails = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;
    const order = await Order.findOne({
        where: { id : orderId, userId },
        include: [
          {
            model: Product,
            through: { attributes: ["quantity"] }
          },
          {
            model: Address,
            as: "address"
          },
          {
            model: User,
            as: "user"
          }
        ]
      });

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    res.status(200).json({ order });
};


const addProductToOrder = async (req, res) => {

    const { quantity } = req.body
    const { orderId, productId } = req.params;
    const order = await Order.findOne({
        where: {
            id: orderId,
            userId: req.user.id
        }
    });
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const orderProduct = await OrderProduct.findOne({ where: { OrderId:orderId, ProductId:productId } })

    
    if (orderProduct) {
        // If product already exists, update the quantity
//but if quantity <=0 delete product from order
        if (quantity <= 0) {
            await orderProduct.destroy();
            return res.status(200).json({ message: 'Product removed from order' });
        }

        orderProduct.quantity += quantity;
        //quantity can't be more than stock
        if (orderProduct.quantity > product.stock) { orderProduct.quantity = product.stock }
        await orderProduct.save();
    } else {
        // If product doesn't exist in the order, create a new entry in OrderProduct table

        //quantity cant be more than stock or less than 1
    const finalQuantity = Math.min(Math.max(quantity, 1), product.stock);

        await OrderProduct.create({ OrderId: orderId, ProductId: productId, quantity: finalQuantity });
    }

    res.status(200).json({ message: 'Product added to order' });
};



const deleteProductFromOrder = async (req, res) => {
    const { orderId, productId } = req.params;
    const order = await Order.findOne({
        where: {
            id: orderId,
            userId: req.user.id
        }
    });
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const orderProduct = await OrderProduct.findOne({ where: { OrderId:orderId, ProductId:productId } })
if (!orderProduct) {
        // If product doesnt exist
        return res.status(404).json({ error: 'Product is not in the order' });

    }

    const deleted = await OrderProduct.destroy({
        where: {
            OrderId:orderId,
            ProductId:productId
        }
    });

    if (deleted) {
        return res.status(200).json({ message: 'Product removed from order' });
    } else {
        return res.status(404).json({ error: 'Product not found in order' });
    }

};




module.exports = {
    findAllOrders,
    findOrderDetails,
    addProductToOrder,
    deleteProductFromOrder,
    findAllOrdersAdmin
};