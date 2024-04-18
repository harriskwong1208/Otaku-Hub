const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  subId: {
    type: String,
    unique: true,
  },
  watchList: {
    type: [String],
  },
  friends: {
    type: [String],
  },
  mangaList: {
    type: [String],
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
});

module.exports = mongoose.model("User", userSchema);
