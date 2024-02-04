const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    score:{
        type:Number
    },
    episodes:{
        type:Number,

    },
    type:{
        type:String,
    },
    description:{
        type:String,
    },
    imageURL:{
        type:String,
    },
})

module.exports = mongoose.model("Anime",animeSchema);