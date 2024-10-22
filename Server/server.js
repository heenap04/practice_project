//FRAMEWORK CONFIGURATION
const express = require('express');
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middlewares/errorHandler");
const cors=require("cors");

//env file configuration
const dotenv=require("dotenv");
dotenv.config();

connectDb();
const app= express();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("working");  
})

app.use(errorHandler);

app.listen(port,() => {
    console.log(`Server running on port http://localhost:${port}`);
});
