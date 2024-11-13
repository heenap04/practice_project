//FRAMEWORK CONFIGURATION
const express = require('express');
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middlewares/errorHandler");
const cors=require("cors");
const hbs = require("hbs");
const path = require("path");
const multer  = require('multer');
const File = require('./model/file');
// const upload = multer({ dest: 'uploads/' });

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

app.use("/api/newsletter", require("./routes/newsletter"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
    })

    const upload = multer({ storage: storage })


    app.get("/home", async (req, res) => {
        // Fetch all uploaded files from MongoDB
        const files = await File.find();
        res.render("home", {
            username: "xyz",
            users: [{ name: "blahblah", age: 30 }, { name: "abc", age: 25 }],
            files: files // Pass files to the template
        });
    });
    
    // Route to handle file upload and save metadata in MongoDB
    app.post('/profile', upload.single('avatar'), async (req, res) => {
        try {
            // Create a new file record in MongoDB
            const fileData = new File({
                originalName: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
            });
    
            await fileData.save(); // Save metadata to MongoDB
            console.log("File metadata saved:", fileData);
    
            return res.redirect("/home");
        } catch (error) {
            console.error("Error uploading file:", error);
            res.status(500).send("Error uploading file.");
        }
    });

//using multer 
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/home");
    })


app.listen(port,() => {
    console.log(`Server running on port http://localhost:${port}`);
});
