import React, { useEffect } from 'react'
import { useState } from "react";
import { api } from '../../utils/api';
import { Rating } from 'react-simple-star-rating'
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';

export default function ReviewForm({ productId ,onReviewSubmit}) {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

    const getRating= async()=>{
    try{ 
        const res = await api.get(`${import.meta.env.VITE_REVIEW}/user/${productId}`);
        const { review} = res.data; 
        setComment(review.comment)
        setRating(review.rating);
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
    if (rating === 0) {
      setErrorMessage("Please provide a rating before submitting."); // Show error message if no rating is selected
      return;
    }
    setErrorMessage("")
   try{
    
    await api.post(`${import.meta.env.VITE_REVIEW}/${productId}`,{rating,comment});

    toast.success("Review submitted");
    if(onReviewSubmit){onReviewSubmit();}
   }
   catch(error){
console.error('Failed to post review:', error);
   }
    
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
   
 // Handle comment input change
 const handleCommentChange = (e) => {
  setComment(e.target.value);
};
  return (
    <div className=' card-body '>
      <h6>Submit a review</h6>
    <Rating
    initialValue={rating}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        /* Available Props */
      />
      {/* Comment Input Field */}
         <Form.Group className="mb-3 mt-3  align-item-center w-100" controlId="exampleForm.ControlTextarea1">
        {/* <Form.Label>Example textarea</Form.Label> */}
        <Form.Control
         as="textarea"
          rows={2}
          
          value={comment}
          onChange={handleCommentChange}  // Updates the comment state
        placeholder={comment?comment:"Write your comment here..."}
         />
      </Form.Group>
      {errorMessage && (
               <div className="alert alert-danger d-flex align-items-center" role="alert" style={{ fontSize: '14px' }}>
               <FontAwesomeIcon icon={faExclamationCircle} style={{ fontSize: '20px', marginRight: '8px', color: 'red' }} />
               {errorMessage}
             </div>
            
            )}
      {/* <button onClick={handleSubmit}>Submit</button> */}
      <Button variant="primary" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

