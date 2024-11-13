const express = require("express");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/jwtMiddleware").validateJwtToken;

const { registerUser, loginUser, myDetails, updateUser } = require("../controllers/userController");

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to login a user with JWT middleware
router.post("/login", jwtAuthMiddleware, loginUser);

router.get("/details", jwtAuthMiddleware,myDetails);

router.put("/update", jwtAuthMiddleware, updateUser);

module.exports = router;
