import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Container, Row, Col, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { api } from '../../utils/api';
import { useParams, Link } from 'react-router-dom';
import ReviewForm from '../Review/ReviewForm';
// import './Orders.css';
import "./Order.css"
export default function Order() {
  const { orderId } = useParams(); // ✅ from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${import.meta.env.VITE_ORDER}/${orderId}`);
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  return (
    <>
    <div className="vh-100">


    
      <Container className="mt-5 mb-5 ">
        <Row className="mb-4">
          <Col sm={12} md={6} lg={6}>
            <Card className="shadow-sm rounded">
              <Card.Body>
                <Card.Title className="text-main-sub">Order #{order.id}</Card.Title>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <Card className="shadow-sm rounded">
              <Card.Body>
                <h5>User Information</h5>
                <p><strong>Address:</strong> {order.address?.street}, {order.address?.city}, {order.address?.postalCode}, {order.address?.country}</p>
                <p><strong>Name:</strong> {order.user?.userName}</p>
                <p><strong>Phone:</strong> {order.user?.phoneNumber}</p>
                <Link to={`/category/products`} className="btn-main mt-3">
                  Continue shopping
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <h4>Products in Your Order</h4>
            <Table responsive="sm" className="shadow-sm rounded">
              <thead className="bg-main-sub text-white">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(order.Products) &&
                  order.Products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td><img src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} className="imageTable" alt={product.name} /></td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price * product.OrderProduct.quantity}</td>
                      <td>{product.OrderProduct.quantity}</td>
                      <td><ReviewForm productId={product.id} /></td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
}
