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
    },
    imageUrl:{
        type:String,
    },
    imageUrlLarge:{
        type:String,
    },
    imageUrlSmall:{
        type:String,
    },
    aired:{
        type:String,
    },
    demographic:{
        type:String,
    },
    studio:{
        type:[String],
    },
    episodes:{
        type:String,

    },
    source:{
        type:String,
    },
    malLink:{
        type:String
    },
    score:{
        type:String
    }
    
})

module.exports = mongoose.model("Anime",animeSchema); 