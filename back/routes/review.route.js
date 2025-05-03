const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware")
const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')

const {
    createReview,
    findProductReviews,
    findUserReview
  } = require("../controllers/review.controller")



  router.get("/:productId",tryCatchWrapper(findProductReviews) )
  router.get("/user/:productId",authMiddleware, tryCatchWrapper(findUserReview) )
  router.post("/:productId",authMiddleware,tryCatchWrapper(createReview))

  module.exports = router