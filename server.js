//server.js -> routes -> controllers->middlewares --> models

//FRAMEWORK CONFIGURATION
const express = require('express');
const connectDb=require("./config/dbConnect");
const errorHandler=require("./middleware/errorHandler");
const cors=require("cors");

connectDb();
const app= express();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
