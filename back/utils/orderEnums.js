const OrderStatus = {
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled"
};

const PaymentMethod = {
    CREDIT_CARD: 'Credit Card',
    PAYPAL: 'PayPal',
    CASH_ON_DELIVERY: 'Cash on Delivery'
};


module.exports = {OrderStatus,PaymentMethod};