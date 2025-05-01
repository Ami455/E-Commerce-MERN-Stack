import React, { useEffect } from 'react'
import { useState } from "react";
import { api } from '../../utils/api';
import { Rating } from 'react-simple-star-rating'
import toast from 'react-hot-toast';

export default function ReviewForm({ productId }) {

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

  
  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () =>{
    console.log('Leave')
  } 
  const onPointerMove = (value, index) => console.log(value, index)

  
  const handleSubmit = async () => {
   try{
    
    await api.post(`${import.meta.env.VITE_REVIEW}/${productId}`,{rating});

    toast.success("Review submitted");
   }
   catch(error){
console.error('Failed to fetch product:', error);
   }
    
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
   

  return (
    <div>
    <Rating
    initialValue={rating}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        /* Available Props */
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

