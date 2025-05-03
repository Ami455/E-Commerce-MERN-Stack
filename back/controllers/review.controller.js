const User = require('../models/user.model');
const Review = require("../models/review.model");


const createReview= async (req, res) => {
  const {rating, comment}  = req.body;
    const userId = req.user.id; 
  const productId = req.params.productId
  let review = await Review.findOne({
    where: { userId, productId }
  });
  
  if (review) {
    // Update existing review
     review.rating = rating;
   if(comment){ review.comment = comment}
    await review.save();
    res.status(200).json({ message: "Review updated", review });
  } else {
    // Create new review
    review = await Review.create({
      productId,
      userId,
      rating,
      comment : comment === undefined ? null : comment

    });
  }

    res.status(201).json(review);
  }


const findProductReviews = async (req, res) => {

    const reviews = await Review.findAll({
      where: { productId: req.params.productId } , include:[{ model:User ,as :"user"}]
    });
    const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

    res.json({ reviews, averageRating });
}
const findUserReview = async (req, res) => {
  const userId=req.user.id
    const review = await Review.findOne({
      where: { productId: req.params.productId, userId }
    });
    
    res.json({ review });
}


  module.exports ={
    createReview,
    findProductReviews,
    findUserReview
  }


  