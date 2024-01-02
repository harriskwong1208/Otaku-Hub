const User = require("../model/User");

const getAllUsers = async(req,res,next)=>{
    let users;

    try{
        users= await User.find();

    }catch(e){
        return next(e);
    }
    if(!users){
        return res.status(500).json({message:"Interna; Server Error."});
 
   }

   return res.status(200).json({users});
}

exports.getAllUsers = getAllUsers;