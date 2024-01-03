const express = require("express");
require("dotenv").config(); 

const router = require("./routes/user-routes");
const mongoose = require("mongoose");
const app = express();

//middleware function to convert json string to json object 
app.use(express.json());



app.use("/users",router);




mongoose.connect(process.env.MONGOURL, {
      dbName: 'OtakuHub',
    }).then(()=>{
        app.listen(5000,()=>
            console.log("Connected and listening on port 5000,connected to the database."))
    }).catch(e=>console.log(e));
