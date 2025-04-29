const Review = require("../models/review.model");


const createReview= async (req, res) => {
  const { rating } = req.body;
  const userId = req.user.id; 

  const review = await Review.create({
    productId: req.params.productId,
    userId,
    rating,
  });

  res.status(201).json(review);
}


const findProductReviews = async (req, res) => {
    
    const reviews = await Review.findAll({
      where: { productId: req.params.productId }
    });
  
    const averageRating = reviews.length
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;
  
    res.json({ reviews, averageRating });
  }


  module.exports ={
    createReview,
    findProductReviews
  }