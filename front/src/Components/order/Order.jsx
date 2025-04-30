
import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { api } from '../../utils/api';
import {useNavigate } from 'react-router-dom';
export default function Order() {

// const order = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user , isAuthenticated} = useSelector((state) => state.auth);
const navigate = useNavigate()
  const fetchOrderData = async () => {
    setLoading(true);
    try {
    const response= await api.get(`${import.meta.env.VITE_ORDER}`);
    console.log(response)
    setOrderData(response.data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); 
  }
  fetchOrderData();
}, [isAuthenticated]);


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

