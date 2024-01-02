const express = require("express");
require("dotenv").config(); 

const router = require("./routes/user-routes");
const mongoose = require("mongoose");
const app = express();



app.use("/users",router);


mongoose.connect(process.env.MONGOURL
    ).then(()=>app.listen(5000,()=>
        console.log("Connected and listening on port 5000"))
    ).catch((e)=>console.log(e));