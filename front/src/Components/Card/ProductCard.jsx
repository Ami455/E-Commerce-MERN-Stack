import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import RatingDisplay from '../Review/RatingDisplay';
import './ProductCard.css'; // Create a separate CSS file for custom styles

export default function CardComponent({ product }) {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
      const getRating= async()=>{
      try{ 
          const res = await api.get(`${import.meta.env.VITE_REVIEW}/${product.id}`);
          const { reviews, averageRating } = res.data; 
          setRating(averageRating);
          setReviews(reviews)
          console.log(reviews.length)
         }
         catch(error){
      console.error('Failed to fetch average rating:', error);
         }
     } 
     useEffect(()=>{
      getRating()
     },[])
     
  return (
    <div>
      <div>
      <Link to={`../details`} state={{ productId: product.id }}>
          <Card.Img variant="top" src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} className='productImage w-100' />
          <Card.Body className='mb-2'>
            <Card.Title>{product.name}</Card.Title>
            <RatingDisplay rating={rating} /> <h6>{reviews.length}</h6>
          </Card.Body>
        </Link>
        <Button variant="primary" className='w-75 mb-3'>Add to Cart</Button>
      </div>
    </div>
    

  );
}
 