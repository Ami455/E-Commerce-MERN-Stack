import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating';
import { api } from '../../utils/api';

export default function RatingDisplay() {
   const [rating, setRating] = useState(0);
    const getRating= async()=>{
    try{ 
        const res = await api.get(`${import.meta.env.VITE_REVIEW}/${productId}`);
        const { reviews, averageRating } = res.data; 
        setRating(averageRating);
       }
       catch(error){
    console.error('Failed to fetch average rating:', error);
       }
   } 
   useEffect(()=>{
    getRating()
   },[])
   
    return (
       
      <>
      
      <Rating
        initialValue={rating}
        readonly
        allowFraction
        size={20}
        SVGstyle={{ display: 'inline-block' }}/>
      
      </>
      
    );
  }


// { path: '/review', element: <ReviewForm productId={5} /> },
//             { path: '/display', element: <RatingDisplay value={4.3} /> },