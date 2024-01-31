
const express = require('express');
const UserRouter = require('./routes/user-routes.js');
const mongoose = require('mongoose');
const  cors = require('cors');
const { CognitoJwtVerifier } = require ('aws-jwt-verify');

require("dotenv").config(); 
const app = express();

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.UserPoolId,
  tokenUse: "access",
  clientId: process.env.ClientId,
});



app.use(cors());

// Middleware function to convert JSON string to JSON object
app.use(express.json());

// const authenticationRequired = async (req, res, next) => {
//   const authHeader = req.headers.authorization || '';
//   if(authHeader){
//     try{
//       const isValidToken = await verifier.verify(authHeader);
//       if (!isValidToken) {
//           return res.status(498).json({ message: "Invalid or missing access token." });
//       }             
//     }catch(e){
//       return next(e);
//     }
//   }else{
//     return res.status(498).json({message:"Must include access token for access!"});
//   }
// };


// app.all('*', authenticationRequired); // Require authentication for all routes


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


