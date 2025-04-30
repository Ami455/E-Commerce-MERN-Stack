import React from 'react'
import { useState } from "react";
import { api } from '../../utils/api';
import { Rating } from 'react-simple-star-rating'

export default function ReviewForm({ productId }) {

  const [rating, setRating] = useState(0);

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

    alert("Review submitted");
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

