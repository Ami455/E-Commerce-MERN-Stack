// import React from 'react'
// import { useLocation } from 'react-router-dom';

// export default function Checkout() {
//     const location = useLocation();
//   const { totalPrice } = location.state || {};
 
//   return (
//     <div>totalPrice: {totalPrice}</div>
//   )
// }
import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
// import { checkout } from '../../../../../back/routes/fav.route';
import { api } from '../../../utils/api';
import { useSelector } from 'react-redux';



const Checkout = () => {

  const { totalPrice } = useLocation().state || {};

  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addresses, setAddresses] = useState([]);
  const {user , isAuthenticated} = useSelector((state) => state.auth);
const payments= ['Credit Card','PayPal','Cash on Delivery']
  const navigate =useNavigate()

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
    setErrorMessage('');
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setErrorMessage('');
  };
const data={
      paymentMethod,
      selectedAddress
    }
  const handleSubmit =async (e) => {
    
    e.preventDefault();
    if (!selectedAddress || !paymentMethod) {
      setErrorMessage('Please select an address and a payment method.');
      return;
    }
    try{

      const response= await api.post(`${import.meta.env.VITE_CHECK_OUT}`, { addressId:selectedAddress, paymentMethod, totalPrice })
      console.log(response)
    }catch(error){
      console.log("error cant post data", error)
    }

    console.log('Order Confirmed:', { selectedAddress, paymentMethod });
    navigate("/order")
  };

  const fetchData = async () => {
    try{

    // const userData= await api.get(`${import.meta.env.VITE_USER}/${user.id}`);
    const addresses= await api.get(`${import.meta.env.VITE_ADDRESS}`);
    console.log(addresses)
    if(addresses.data.length>0){ setAddresses(addresses.data)}
    
    }catch(error){
     console.error('Failed to fetch data', error);
        }
       };
  useEffect(() => {
           if (!isAuthenticated) {
               navigate("/login");
           }
           fetchData()
           
       }, [isAuthenticated]);

       const grand_total= totalPrice + 50 + 30;

  return (
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">Checkout</Card.Title>
          <Form onSubmit={handleSubmit}>
            {/* Address Selection */}
            <Form.Group controlId="addressSelect" className="mb-3">
              <Form.Label>Select Address</Form.Label>
              <Form.Select value={data.selectedAddress} onChange={handleAddressChange}>
                <option value="">Select an address</option>
                {addresses.map((address)=>
                <option key={address.id} value={`Address ${address.id}`}>{`${address.street}, ${address.city}, ${address.country}`}</option>
                )}
                
              </Form.Select>
            </Form.Group>

            {/* Payment Method */}
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <div>
               { payments.map((payment)=>
                 <Form.Check key={payment}
                  type="radio"
                  label={payment}
                  name="paymentMethod"
                  value={`${payment}`}
                  onChange={handlePaymentChange}
                  checked={data.paymentMethod === payment}
                />
                )}
                
              </div>
            </Form.Group>

            {/* Order Summary */}
            <div className="mb-3">
              <p>Total Price: ${totalPrice}</p>
              <p>Fees: $50</p>
              <p>Delivery: $30</p>
              <hr />
              <p><strong>Grand Total: ${grand_total}</strong></p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Confirm Order
              
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </div>
  );
};

export default Checkout;
