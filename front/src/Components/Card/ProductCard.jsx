import React from 'react'
import  Card  from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import './ProductCard.css'
export default function CardComponent({product}) {
  return (
    <div> 
      <Card style={{ width: 'fit-content', textAlign:'center', alignItems:'center', alignContent:'center'}}>
      <Link to={`card/${product.id}`}>
      <Card.Img variant="top" src={product.image} className='productImage'/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          No text
        </Card.Text>
      </Card.Body>
      </Link>  
        <Button variant="primary" className='w-75 mb-3'>Add to Cart</Button>
    </Card>
    </div>
  )
}
