const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware")
const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')

const {
    createReview,
    findProductReviews
  } = require("../controllers/review.controller")



  router.get("/:productId",tryCatchWrapper(findProductReviews) )
  router.post("/:productId",authMiddleware,tryCatchWrapper(createReview))

  module.exports = router