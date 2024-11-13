// const jwt = require('jsonwebtoken');

// const generateToken=(userData)=>{
//     //in this function we are creating a new fresh jwt token to provide user, for login/session management or for authorization purspose.
//     return jwt.sign(userData,process.env.PRIVATE_KEY);
// }
// const validateJwtToken=(req,res,next)=>{
//     //first we are checking that jwt token is available or not 
//     const authorization=req.headers.authorization;
//     //output: 1. bearer ssdddfghhhb 
//     //2. ssdddfghhhb
//     //3. "blank"
//     //4. token bna hi nhi h, local ho ya endpoint testing s bheja ho, without token header send kra h
//     if(!authorization){
//         return res.status(401).json({err:'token not available'});
//     }
// //we are storing token values from headers and spliting them to get "bearer xyz.abc.cbd" to "xyz.abc.cbd"
//     const token = req.headers.authorization.split(' ')[1];

//     //token provided is wrong, throw error message unauthorized user
//     if(!token){
//         return res.status(401).json({err:'unauthorized user'});
//     }

//     try{
//         //in this error handler try catch: we are handling, if token is validated or verified, then move to next middleware or respond back to client.
//         const validateToken = jwt.verify(token,process.env.PRIVATE_KEY);
//         req.user=validateToken;
//         next();
//     }catch(err){
//         console.err("error occured:",err.message);
//     }

// }
// module.exports={generateToken, validateJwtToken}


const jwt = require('jsonwebtoken');

const generateToken = (userData) => {
    // Create and return a JWT token for the user with the secret key
    return jwt.sign(userData, process.env.PRIVATE_KEY);
}

const validateJwtToken = (req, res, next) => {
    // Check if the Authorization header is available
    const authorization = req.headers.authorization;

    // If no Authorization header is present, return an error
    if (!authorization) {
        return res.status(401).json({ err: 'Token not available' });
    }

    // Extract the token part after 'Bearer'
    const token = authorization.split(' ')[1];

    // Check if the token is missing or invalid
    if (!token) {
        return res.status(401).json({ err: 'Unauthorized user' });
    }

    try {
        // Verify the token using the private key
        const validateToken = jwt.verify(token, process.env.PRIVATE_KEY);

        // Attach the decoded user data to the request object
        req.user = validateToken;

        // Proceed to the next middleware
        next();
    } catch (err) {
        console.error("Error occurred:", err.message);
        
        // Send an error response if token validation fails
        return res.status(401).json({ err: 'Invalid or expired token' });
    }
}

module.exports = { generateToken, validateJwtToken };
