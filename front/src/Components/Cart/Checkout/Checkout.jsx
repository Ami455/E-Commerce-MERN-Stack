import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Checkout() {
    const location = useLocation();
  const { totalPrice } = location.state || {};
 
  return (
    <div>totalPrice: {totalPrice}</div>
  )
}
