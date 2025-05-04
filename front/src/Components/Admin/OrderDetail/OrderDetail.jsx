import React, { useState, useEffect } from 'react';
import { Spinner, Table, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

// import ReviewForm from '../Review/ReviewForm';
import { api } from '../../../utils/api';

export default function OrderDetail() {

    const { orderId } = useLocation().state || {};

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const fetchOrderData = async () => {
        setLoading(true);
        try {
            const response = await api.get(`${import.meta.env.VITE_ORDER}/${orderId}`);
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



    return (
        <>
            <>

                <Accordion className='mb-3'>
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header>
                            <strong>Order #{order.id}</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>Total Price: ${order.totalPrice}</p>
                            <p>Status: {order.status}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>



                            <Accordion className='mb-3'>
                                <Accordion.Item eventKey="0" >
                                    <Accordion.Header>
                                        <strong>User Information</strong>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>Username: {order.user.userName}</p>
                                        <p>User Email: {order.user.email}</p>
                                        <p>Phone: {order.user.phoneNumber}</p>
                                        <p>Address:
                                            {order.address?.street},
                                            {order.address?.city},
                                            {order.address?.postalCode},
                                            {order.address?.country}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <Accordion className='mb-3'>
                                <Accordion.Item eventKey="1" >


                                    <Accordion.Header>
                                        <strong>Products Information</strong>
                                    </Accordion.Header>
                                    <Accordion.Body>

                                        <Table className=' bg-light-subtle'>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "5%" }}>#</th>
                                                    <th style={{ width: "15%" }}>Image</th>
                                                    <th style={{ width: "30%" }}>Name</th>
                                                    <th style={{ width: "15%" }}>Category</th>
                                                    <th style={{ width: "5%" }}>Price</th>

                                                    <th style={{ width: "5%" }}>Quantity</th>

                                                    {/* <th style={{ width: "15%" }}>Review</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(order.Products) && order.Products.map((product, index) =>

                                                    <tr key={product.id} >
                                                        <td>{product.id}</td>
                                                        <td><img src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} className='imageTable' /></td>
                                                        <td>{product.name}</td>
                                                        <td>{product.categoryId}</td>
                                                        <td>{product.price /** product.OrderProduct.quantity*/}</td>
                                                        <td>{product.OrderProduct.quantity}</td>
                                                        {/* <td><ReviewForm productId={product.id}/></td>  */}

                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>




                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>


                    </Accordion.Item>

                </Accordion>

            </>
        </>
    )
}
