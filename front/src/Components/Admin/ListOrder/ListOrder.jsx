import React, { useEffect, useState } from 'react'
import { api } from '../../../utils/api';
import { Accordion, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ListOrder() {

  const [orderInfo, setOrderInfo] = useState();

  const getOrder = async () => {
    const data = await api.get(`${import.meta.env.VITE_ORDER_ADMIN}`)
    
    setOrderInfo(data.data);
    console.log("orders", data.data);
  }

  const updateOrder =async (id) => {
    const data = await api.put(`${import.meta.env.VITE_ORDER}/admin/${id}`)
    console.log(data);
  }

  console.log(orderInfo)

  useEffect(() => {
    getOrder()
  }, []);

  return (

    <>
      {orderInfo ? (
        orderInfo.map((order, index) => (
          <Accordion key={order.id} defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey={String(index)}>
              <Accordion.Header>
                <strong>Order #{order.id}</strong>
              </Accordion.Header>
              <Accordion.Body>
                <p>User: {order.user.userName}</p>
                <p>User Email: {order.user.email}</p>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Status: {order.status}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
                {/* Example of links, you should replace with your needs */}

                <Button
                  as={Link}
                  to={`../order/details`}
                  variant="primary"
                  className="mt-3"
                  state={{ orderId: order.id }} // Pass the order ID to the details page
                >
                  View Order Details
                </Button>

                <Button
                  as={Link}
                  to={`../order/edit`}
                  variant="primary"
                  className="mt-3 ms-3"
                  state={{ orderId: order.id }} // Pass the order ID to the details page
                >
                  update status
                </Button>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))
      ) : (
        <p>Loading Orders...</p>
      )}
    </>
  );
}
