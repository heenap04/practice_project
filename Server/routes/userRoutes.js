const express = require("express");
const router = express.Router();
const jwtAuthMiddleware = require("../middlewares/jwtMiddleware").validateJwtToken;

const { registerUser, loginUser } = require("../controllers/userController");

// My Account function to get user details by email
const myAccount = async (req, res) => {
    try {
        const userEmail = req.user.email; // Get email from JWT token payload
        const user = await User.findOne({ email: userEmail });  // Find user by email

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to login a user with JWT middleware
router.post("/login", jwtAuthMiddleware, loginUser);

// Protected routes to access user account details by email
router.get("/my-account", jwtAuthMiddleware, myAccount);
router.post("/my-account", jwtAuthMiddleware, myAccount);

module.exports = router;
