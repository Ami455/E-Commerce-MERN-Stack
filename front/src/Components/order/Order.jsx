
import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function Order() {

// const order = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      try {
        // إرسال الـ request لجلب الطلبات بناءً على الـ user ID
        const response = await axios.get('/api/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // أو أي طريقة تستخدمها للحصول على الـ token
          },
        });
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!orderData) {
    return <p>No order found.</p>;
  }

  return (
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Order #{orderData.id}</Card.Title>
          <p><strong>Status:</strong> {orderData.status}</p>
          <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
          <p><strong>Total Price:</strong> ${orderData.totalPrice}</p>
          
          <h5>User Information</h5>
          <p><strong>Address:</strong> {orderData.address?.address}</p>
          <p><strong>Name:</strong> {orderData.user?.userName}</p>
          <p><strong>Phone:</strong> {orderData.user?.phoneNumber}</p>
          
          <h5>Products</h5>
          {orderData.products?.map(product => (
            <div key={product.id}>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Quantity:</strong> {product.OrderProduct?.quantity}</p>
            </div>
            ))}
         
          
          <Button variant="primary" onClick={() => alert('Order confirmed!')}>
            Confirm Order
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
// }

// import React from 'react'

// export default function Order() {
//   return (
//     <div>Order</div>
//   )
// }
