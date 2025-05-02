const User = require('../models/user.model');
const Review = require("../models/review.model");


const createReview= async (req, res) => {
  const {rating}  = req.body;
  console.log(rating)
    const userId = req.user.id; 
  const productId = req.params.productId
  let review = await Review.findOne({
    where: { userId, productId }
  });
  
  if (review) {
    // Update existing review
    review.rating = rating;
    await review.save();
    res.status(200).json({ message: "Review updated", review });
  } else {
    // Create new review
    review = await Review.create({
      productId,
      userId,
      rating
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


  module.exports ={
    createReview,
    findProductReviews
  }


  