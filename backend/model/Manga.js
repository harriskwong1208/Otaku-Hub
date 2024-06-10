const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  mal_id: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  imageUrlLarge: {
    type: String,
  },
  imageUrlSmall: {
    type: String,
  },
  published: {
    type: String,
  },
  demographic: {
    type: String,
  },
  serializations: {
    type: [String],
  },
  chapters: {
    type: Number,
  },
  type: {
    type: String,
  },
  malLink: {
    type: String,
  },
  score: {
    type: Number,
  },
  reviews: {
    type: [String],
  },
});

module.exports = mongoose.model("Manga", mangaSchema);
