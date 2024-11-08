const express = require("express");
const router = express.Router();
const jwtAuthMiddleware  = require("../middlewares/jwtMiddleware").validateJwtToken;

const { registerUser, loginUser } = require("../controllers/userController");

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

router.post("/login",jwtAuthMiddleware,loginUser);

module.exports = router;