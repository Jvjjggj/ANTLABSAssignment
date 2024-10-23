// /middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

const auth = async (req, res, next) => {
  // Check for the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify the token and extract userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by ID and exclude the password
    const user = await User.findById(decoded.userId).select('-password'); 
    if (!user) return res.status(404).json({ msg: 'User not found' });

    req.user = user; // Attach user details to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = auth;
