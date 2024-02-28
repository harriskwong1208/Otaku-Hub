const Manga = require('../model/Manga');
require("dotenv").config();



const getAllManga = async(req,res,next)=>{
    let manga;

    manga= await Manga.find();
    if(!manga){
        return res.status(500).json({message:"Internal; Server Error."});
    }

    return res.status(200).json({manga});

}


const getMangaById = async(req,res,next)=>{
    const id = req.params.id;
    let manga;
    try{
        manga = await Manga.findById(id);
    }catch(e){
        return next(e);
    }
    if(!manga){
        return res.status(404).json({message:"Manga not found."})
    }
    return res.status(200).json({manga});
}

const addManga = async(req,res,next)=>{
    const {...rest} = req.body;
    let manga;
    try{
        manga = new Manga({
            ...rest
        })
        manga = await manga.save();
    }catch(e){
        return next(e);
    }
    if(!manga){
        return res.status(500).json({message:"Unable to save."});
    }
    return res.status(201).json({manga});
}

exports.addManga = addManga;
exports.getMangaById = getMangaById;
exports.getAllManga = getAllManga;