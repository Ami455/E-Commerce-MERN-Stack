
import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { api } from '../../utils/api';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReviewForm from '../Review/ReviewForm';
export default function Order() {

    const { orderId } = useParams(); // ✅ from URL
// const order = () => {
  //const { orderId } = useLocation().state || {};
  //const [orderData, setOrderData] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user , isAuthenticated} = useSelector((state) => state.auth);
const navigate = useNavigate()
  const fetchOrderData = async () => {
    setLoading(true);
    try {
    const response= await api.get(`${import.meta.env.VITE_ORDER}/${orderId}`);
    console.log(response)
    //setOrderData(response.data.order);
    setOrder(response.data.order);
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login"); 
  // }
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

  if (!order) {
    return <p>No order found.</p>;
  }

  return (<>
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Order #{order.id}</Card.Title>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice}</p>
          
          <h5>User Information</h5>
          <p><strong>Address:</strong> {order.address?.street}, {order.address?.city}, {order.address?.postalCode}, {order.address?.country}</p>

          <p><strong>Name:</strong> {order.user?.userName}</p>
          <p><strong>Phone:</strong> {order.user?.phoneNumber}</p>
          
          <h5>Products</h5>
          {order.Products?.map(product => (
            <div key={product.id}>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Quantity:</strong> {product.OrderProduct?.quantity}</p>
            </div>
            ))}
         
          
         <Link to={`/category/products`}>
          Continue shopping
        </Link>
        </Card.Body>
      </Card>
    </div>
    <Container className='mt-5 mb-5 text-center'>
         
    <Table>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th style={{ width: "15%" }}>Image</th>
                      <th style={{ width: "30%" }}>Name</th>
                      <th style={{ width: "15%" }}>Category</th>
                      <th style={{ width: "5%" }}>Price</th>
                      
                      <th style={{ width: "5%" }}>Quantity</th>
  
                      <th style={{ width: "15%" }}>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    { Array.isArray(order.Products) && order.Products.map((product, index) => 

                      <tr key={product.id} >
                        <td>{product.id}</td>
                        <td><img src={product.image} className='imageTable' /></td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price/**product.OrderProduct.quantity*/}</td>
                        <td>{product.OrderProduct.quantity}</td>
                        <td><ReviewForm productId={product.id}/></td> 
    
                      </tr>
                    )}
                  </tbody>
                </Table>
               
    
    </Container>
            </>
  );
};

