const OrderStatus = {
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled"
};

const PaymentMethod = {
    CREDIT_CARD: "credit_card",
    PAYPAL: "paypal",
    CASH_ON_DELIVERY: "cash_on_delivery"
};


module.exports = {OrderStatus,PaymentMethod};