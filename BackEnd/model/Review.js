const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
