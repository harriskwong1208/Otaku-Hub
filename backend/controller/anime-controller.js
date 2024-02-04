const Anime = require('../model/Anime');
require("dotenv").config();

const getAnimeById = async(req,res,next)=>{
    const id = req.params.id;
    let anime;
    try{
        anime = await Anime.findById(id);
    }catch(e){
        return next(e);
    }
    if(!anime){
        return res.status(404).json({message:"Anime not found."})
    }
    return res.status(200).json({anime});
}

const addAnime = async(req,res,next)=>{
    const {name,score,episodes,type,description,imageURL} = req.body;
    let anime;
    try{
        anime = new Anime({
            name,
            score,
            episodes,
            type,
            description,
            imageURL
        })
        anime = await anime.save();
    }catch(e){
        return next(e);
    }
    if(!anime){
        return res.status(500).json({message:"Unable to save."});
    }
    return res.status(201).json({anime});
}

exports.addAnime = addAnime;
exports.getAnimeById = getAnimeById;