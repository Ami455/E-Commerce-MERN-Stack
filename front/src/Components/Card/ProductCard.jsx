import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Create a separate CSS file for custom styles

export default function CardComponent({ product }) {
  
  return (
    <div>
      <Card style={{ width: 'fit-content', textAlign: 'center', alignItems: 'center', alignContent: 'center' }}>
      <Link to={`../details`} state={{ productId: product.id }}>
          <Card.Img variant="top" src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} className='productImage' />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              No text
            </Card.Text>
          </Card.Body>
        </Link>
        {/* <Button variant="primary" className='w-75 mb-3'>Add to Cart</Button> */}
      </Card>
    </div>
    

  );
}
