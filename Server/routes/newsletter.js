const express = require('express');
const router=express.Router();
const {getNewsletter, createNewsletter}=require("../controllers/newsletterController");
const jwtAuthMiddleware = require("../middlewares/jwtMiddleware");

router.get("/",getNewsletter);

router.post("/",jwtAuthMiddleware ,createNewsletter);
