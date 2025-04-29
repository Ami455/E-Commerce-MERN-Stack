// import React from 'react'
// import { useLocation } from 'react-router-dom';

// export default function Checkout() {
//     const location = useLocation();
//   const { totalPrice } = location.state || {};
 
//   return (
//     <div>totalPrice: {totalPrice}</div>
//   )
// }
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
    setErrorMessage('');
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAddress || !paymentMethod) {
      setErrorMessage('Please select an address and a payment method.');
      return;
    }
    console.log('Order Confirmed:', { selectedAddress, paymentMethod });
  };

  return (
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">Checkout</Card.Title>
          <Form onSubmit={handleSubmit}>
            {/* Address Selection */}
            <Form.Group controlId="addressSelect" className="mb-3">
              <Form.Label>Select Address</Form.Label>
              <Form.Select value={selectedAddress} onChange={handleAddressChange}>
                <option value="">Select an address</option>
                <option value="Address 1">Address 1</option>
                <option value="Address 2">Address 2</option>
                <option value="Address 3">Address 3</option>
              </Form.Select>
            </Form.Group>

            {/* Payment Method */}
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Credit Card"
                  name="paymentMethod"
                  value="credit_card"
                  onChange={handlePaymentChange}
                  checked={paymentMethod === 'credit_card'}
                />
                <Form.Check
                  type="radio"
                  label="PayPal"
                  name="paymentMethod"
                  value="paypal"
                  onChange={handlePaymentChange}
                  checked={paymentMethod === 'paypal'}
                />
                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  name="paymentMethod"
                  value="cash_on_delivery"
                  onChange={handlePaymentChange}
                  checked={paymentMethod === 'cash_on_delivery'}
                />
              </div>
            </Form.Group>

            {/* Order Summary */}
            <div className="mb-3">
              <p>Total Price: $1000</p>
              <p>Fees: $50</p>
              <p>Delivery: $30</p>
              <hr />
              <p><strong>Grand Total: $1080</strong></p>
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
