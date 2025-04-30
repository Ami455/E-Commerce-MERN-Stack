const Address = require('../models/address.model');
const  Cart  = require('../models/Cart.model');
const  Order  = require('../models/Order.model');
const OrderProduct = require('../models/OrderProduct.model');
const Product = require('../models/Products.model');
const { OrderStatus, PaymentMethod } = require('../utils/orderEnums');


const checkout = async(req, res)=>{
    const { addressId, paymentMethod, totalPrice } = req.body;
    const userId = req.user.id;
console.log(addressId, paymentMethod, totalPrice)
    // 1. Find user's cart
    const cart = await Cart.findOne({
        where: {userId},
        include:{
            model: Product,
            through: {attributes: ['quantity']} // load CartProduct.quantity
        }
    });
    if (!cart || cart.Products.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

// 2. Find selected shipping address
const address = await Address.findOne({
    where: {id: addressId, userId}
});

if (!address) {
    return res.status(404).json({ message: "Address not found" });
}

// 3. check paymentMethod (convert PaymentMethod enum to array first)
if (!Object.values(PaymentMethod).includes(paymentMethod)) {
    return res.status(400).json({ message: "Invalid payment method" });
  }

// 4. Create the order
const order = await Order.create({
    userId,
    paymentMethod,
    status: OrderStatus.PENDING,
    totalPrice
});

// 5. move cart products to the order
const orderProducts = cart.Products.map((product)=>({
    OrderId: order.id,
    ProductId: product.id,
    quantity : product.cartProduct.quantity,
}))

await OrderProduct.bulkCreate(orderProducts);

// 6. Link address to the order
await order.setAddress(address)

// 7. Empty the cart after checkout
await cart.setProducts([]);


res.status(201).json({ message: "Order placed successfully", orderId: order.id });

}


module.exports = {
    checkout
};