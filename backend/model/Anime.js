const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    mal_id:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Anime",animeSchema); 