const {verifyToken} = require('../utils/jwt')

const authMiddleware =(req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token); // Verify the token
    req.user = decoded; // Attach the decoded user info to the request object

    console.log(req.user); // Log the user info for debugging

    next(); // Call the next middleware or route handler

};

module.exports = authMiddleware;


