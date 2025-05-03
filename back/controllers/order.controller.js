const Order = require('../models/Order.model');
const { OrderStatus } = require('../utils/orderEnums');

// Handles both updating status and canceling an order
const updateOrderStatus = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    // Check if provided status is valid
    if (!Object.values(OrderStatus).includes(status)) {
        return res.status(400).json({ error: 'Invalid order status' });
    }

    // Find the order
    const order = await Order.findByPk(id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    
    if (status === OrderStatus.CANCELLED && (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED)) {
        return res.status(400).json({ error: 'Cannot cancel shipped or delivered orders' });
    }
    // Update status
    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully', order });

}

module.exports = {
    updateOrderStatus,
};
