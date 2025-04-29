import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Create a separate CSS file for custom styles

export default function CardComponent({ product }) {
  
  return (
    <div>
      <div  >
      <Link to={`../details`} state={{ productId: product.id }}>
          <Card.Img variant="top" src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} className='productImage w-100' />
          <Card.Body className='mb-2'>
            <Card.Title>{product.name}</Card.Title>
            
          </Card.Body>
        </Link>
        {/* <Button variant="primary" className='w-75 mb-3'>Add to Cart</Button> */}
      </div>
    </div>
    

  );
}
