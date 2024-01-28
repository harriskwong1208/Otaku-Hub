
const express = require('express');
const UserRouter = require('./routes/user-routes.js');
const mongoose = require('mongoose');
require("dotenv").config(); 

const app = express();

const  cors = require('cors');
app.use(cors());

// Middleware function to convert JSON string to JSON object
app.use(express.json());



app.use("/api/users", UserRouter);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGOURL, {
  dbName: 'OtakuHub',
}).then(() => {
  console.log('OtakuHub database connected !!')
}).catch(e => console.log(e));

app.listen(PORT, () =>
console.log(`listening on port ${PORT}.`)
);


