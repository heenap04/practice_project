// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
// const User = require("../model/userModel");

// const registerUser = asyncHandler(async (req, res) => {
//     const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

//     // Validate required fields
//     if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
//         res.status(400);
//         throw new Error("Please fill all fields");
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     const newUser = await User.create({
//         firstName,
//         lastName,
//         age,
//         gender,
//         bloodGroup,
//         email,
//         phoneNumber,
//         password: hashedPassword,
//     });

//     res.status(201).json({ message: "User registered successfully", user: newUser });
// });

// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         res.status(400);
//         throw new Error("Please provide email and password");
//     }
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//         res.status(200).json({
//             message: "User logged in successfully",
//             user: {
//                 id: user._id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//             },
//         });
//     } else {
//         res.status(401);
//         throw new Error("Invalid email or password");
//     }
// });

// module.exports = { registerUser, loginUser };


const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const User = require("../model/userModel");

// Secret key for JWT (You might want to keep this in environment variables)
const JWT_SECRET = "hey2004abc"; // Replace this with a secure, environment-specific secret key

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

// Login user with dynamic JWT token
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour

    res.json({ message: "Login successful", token });
});

const myDetails = async(req,res)=>{
    const id = req.user.id;
    const userExists = await user.findById(id);
    if(userExists){
        res.send({userExists});
    }else{
        res.status(404).json({message:"user not found"});
    }
};

const updateUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;  // Get user ID from req.user (set by JWT middleware)
    
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update user fields with the data provided in the request body
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber } = req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.bloodGroup = bloodGroup || user.bloodGroup;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    // Save the updated user data
    const updatedUser = await user.save();

    res.json({ message: "User updated successfully", user: updatedUser });
});

module.exports = { registerUser, loginUser, myDetails, updateUser };