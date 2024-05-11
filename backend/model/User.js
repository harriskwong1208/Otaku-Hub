const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
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
  //[mal_id,rating,status(watch,dropped,on Hold)]
  watchList: {
    type: [[String, Number, String]],
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
  fav_anime: {
    type: String,
  },
  fav_manga: {
    type: String,
  },
  fav_character: {
    type: String,
  },
  bio: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
