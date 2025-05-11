import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import RatingDisplay from '../Review/RatingDisplay';
import './ProductCard.css'; // Create a separate CSS file for custom styles

export default function CardComponent({ product }) {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const getRating = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_REVIEW}/${product.id}`);
      const { reviews, averageRating } = res.data;
      setRating(averageRating);
      setReviews(reviews)
      console.log(reviews.length)
    }
    catch (error) {
      console.error('Failed to fetch average rating:', error);
    }
  }
  useEffect(() => {
    getRating()
  }, [])

  return (
    <div>
    <Card className="h-100 border-0 shadow-sm product-card hover-shadow transition">
      <Link to={`../details`} state={{ productId: product.id }} className="text-decoration-none text-dark">
        <Card.Img 
          variant="top" 
          src={`${import.meta.env.VITE_LOCAL_HOST}/uploads/${product.image}`} 
          className="productImage w-100 p-3" 
          style={{ objectFit: 'cover', height: '250px', borderRadius: '1rem 1rem 0 0' }}
        />
        <Card.Body className="d-flex flex-column align-items-center text-center">
          <Card.Title className="nameProduct fs-5 fw-bold mb-2">{product.name}</Card.Title>
          {/* If you add rating later: */}
          {/* <RatingDisplay rating={rating} />
          <small className="text-muted">{reviews.length} reviews</small> */}
        </Card.Body>
      </Link>
    </Card>
    </div>


  );
}
