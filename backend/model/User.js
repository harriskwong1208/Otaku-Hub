const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    unique:true
  },
  anime:{
    type: [String]
  }
});

module.exports = mongoose.model("User",userSchema);
