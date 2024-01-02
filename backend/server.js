const express = require("express");
require("dotenv").config(); 


const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGOURL
).then(()=>console.log('Successfully connected to database.')
).catch((e)=>console.log(e));

const db = mongoose.connection;






app.get('/',(req,res)=>{
    res.send("Hello again")
});

app.listen(5000,()=>console.log("Connected and listening on port 5000"));
