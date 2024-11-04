//FRAMEWORK CONFIGURATION
const express = require('express');
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middlewares/errorHandler");
const cors=require("cors");
const hbs = require("hbs");
const path = require("path");

//env file configuration
const dotenv=require("dotenv");
dotenv.config();

connectDb();
const app= express();
app.set('view engine', 'hbs');
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("working");  
});

app.get('/home',(req,res)=>{
    res.render('home',{
        username: "Nitish",
        posts: "flana dhimkana"
    })
})

app.get('/allusers',(req,res)=>{
    res.render('allusers',{
        data:[{name:"nishu", age:20},
            {name:"heena", age:19}]
    })
})

app.use(errorHandler);

//register route
app.use("/api/register" , require("./routes/userRoutes"));

app.use("/api/registerDocter", require("./routes/doctorsDetails"));



app.listen(port,() => {
    console.log(`Server running on port http://localhost:${port}`);
});
