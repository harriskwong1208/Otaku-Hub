const express = require("express");
const {
  getAllReviews,
  addReview,
  deleteReview,
  getReview,
} = require("../controller/review-controller");
const reviewRouter = express.Router();

reviewRouter.get("/:id", getReview);
reviewRouter.post("/", addReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.delete("/:id", deleteReview);

module.exports = reviewRouter;
