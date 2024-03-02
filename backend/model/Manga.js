const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    mal_id:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    published:{
        type:String,
    },
    demographic:{
        type:String,
    },
    serializations:{
        type:[String],
    },
    chapters:{
        type:Number,

    },
    type:{
        type:String,
    },
    malLink:{
        type:String
    },
    score:{
        type:Number
    },

    
})

module.exports = mongoose.model("Manga",mangaSchema); 