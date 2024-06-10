const Review = require("../model/Review");
// const { param } = require("../routes/user-routes");

require("dotenv").config();

const getAllReviews = async (req, res, next) => {
  let reviews;

  reviews = await Review.find().select("title user rating description title");
  if (!reviews) {
    return res.status(500).json({ message: "Internal; Server Error." });
  }

  return res.status(200).json({ reviews });
};

const addReview = async (req, res, next) => {
  const { title, user, rating, description } = req.body;
  let review;
  try {
    review = new Review({
      title,
      user,
      rating,
      description,
    });
    review = await review.save();
  } catch (e) {
    return next(e);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save review" });
  }
  return res.status(201).json({ review });
};

const deleteReview = async (req, res, next) => {
  const id = req.params.id;
  let review;
  try {
    review = await Review.findByIdAndDelete(id);
  } catch (e) {
    return next(e);
  }
  if (!review) {
    return res.status(500), json({ msessage: "Unable to delete review." });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};

const getReview = async (req, res, next) => {
  const id = req.params.id;
  let review;
  try {
    review = await Review.findById(id).select("title rating user description ");
  } catch (e) {
    return next(e);
  }
  if (!review) {
    return res.status(500).json({ message: "Unable to find review." });
  }
  return res.status(200).json({ review });
};

exports.getAllReviews = getAllReviews;
exports.addReview = addReview;
exports.deleteReview = deleteReview;
exports.getReview = getReview;
