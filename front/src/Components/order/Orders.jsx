
import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { api } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
export default function Orders() {

  const [orders, setOrders] = useState([]);
  
  const {user , isAuthenticated} = useSelector((state) => state.auth);
const navigate = useNavigate()
  const fetchOrdersData = async () => {
    try {
    const response= await api.get(`${import.meta.env.VITE_ORDER}`);
    console.log(response)
    setOrders(response.data);
   console.log("orders" ,response.data)
    } catch (error) {
      console.error('Error fetching orders data:', error);
    } 
  };


  useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login"); 
//   }
  fetchOrdersData();
  console.log(isAuthenticated)
}, [/*isAuthenticated*/]);


 
  return (
    <>
    {orders.map((order)=>
    <div className="container  mt-5" key={order.id}>
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
        
        <h5>Products: ${order.Products.length}</h5>
        {/* {order.Products?.map(product => (
          <div key={product.id}>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Quantity:</strong> {product.OrderProduct?.quantity}</p>
          </div>
          ))} */}
       
        
        <Link to={`/order/${order.id}`}>
          See Order details
        </Link>
      </Card.Body>
    </Card>
  </div>
 
    )}
    </>
  );
};

