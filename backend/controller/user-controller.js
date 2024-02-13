const User = require("../model/User");

require("dotenv").config(); 




const getAllUsers = async(req,res,next)=>{
    let users;

    //Only return name, email, and Id. Keeping subId and password safe
    users= await User.find().select('name email subId');
    if(!users){
        return res.status(500).json({message:"Internal; Server Error."});
    }

    return res.status(200).json({users});

}


const addUser = async(req,res,next)=>{
    const {name,email,password} = req.body;
    let user ;
    try{
        user = new User({
            name,
            email,
            password,
        });
        user = await user.save();
    }catch(e){
        return next(e);
    }
    if(!user){
       return res.status(500).json({message:"Unable to save user"});
    }
    return res.status(201).json({user});
}

const updateUser = async(req,res,next)=>{
    const id = req.params.id;
    const {name,email,password,subId,animeId} = req.body;


        let user ;
        try{
            user = await User.findByIdAndUpdate(id,
                {name,email,password,subId,$push:{watchList: animeId}});
        }catch(e){
            return next(e);
        }    
        if(!user){
            return res.status(500),json({msessage:"Unable to update user."});
        }
        return res.status(200).json({message:"Updated successfully"});

}


const deleteUser = async(req,res,next)=>{
    const id = req.params.id;
    let user ;
    try{
        user = await User.findByIdAndRemove(id);
    }catch(e){
        return next(e);
    }    
    if(!user){
        return res.status(500),json({msessage:"Unable to delete user."});
    }
    return res.status(200).json({message:"Deleted successfully"});

}

const getUser = async(req,res,next)=>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id).select('name email watchList');
    }catch(e){
        return next(e);
    }
    if(!user){
        return res.status(500).json({message:"Unable to find user."})
    }
    return res.status(200).json({user});
}


exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;