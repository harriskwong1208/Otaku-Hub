const Anime = require('../model/Anime');
require("dotenv").config();



const getAllAnime = async(req,res,next)=>{
    let anime;

    anime= await Anime.find();
    if(!anime){
        return res.status(500).json({message:"Internal; Server Error."});
    }

    return res.status(200).json({anime});

}


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
    const {name,mal_id,imageUrl,aired,demographic,studio,
        episodes,source,malLink,score} = req.body;
    let anime;
    try{
        anime = new Anime({
            name,
            mal_id,
            imageUrl,aired,demographic,studio,
        episodes,source,malLink,score
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
exports.getAllAnime = getAllAnime;