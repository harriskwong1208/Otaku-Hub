import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/user-routes.js";
import mongoose from "mongoose";

import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
// function to convert the URL of the current module (import.meta.url) 
// into a file path (__filename). Then, path.dirname is used 
// to get the directory name (__dirname) from the file path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

import cors from 'cors';
app.use(cors());

// Middleware function to convert JSON string to JSON object
app.use(express.json());

//middleware to serve static files from the specified directory.
// In this case, it's serving files from the '../build' directory 
// relative to the current module's directory.
app.use(express.static(path.join(__dirname,'../build')));
//Render react app when route is not /api
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use("/api/users", UserRouter);

const PORT = process.env.PORT || 8000
mongoose.connect(process.env.MONGOURL, {
  dbName: 'OtakuHub',
}).then(() => {
  app.listen(PORT, () =>
    console.log(`Connected and listening on port ${PORT}, connected to the database.`)
  );
}).catch(e => console.log(e));
