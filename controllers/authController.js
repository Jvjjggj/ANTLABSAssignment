// /controllers/authController.js

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create a new user instance
    user = new User({ name, email, password, role });

    // Save user in the database
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Return the token and role
    res.json({ token, role: user.role });
  } catch (err) {
    console.error('Error in user registration:', err.message);  // <-- log the actual error
    res.status(500).json({ msg: 'Server error', error: err.message }); // <-- include detailed error in response
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Return the token and role
    res.json({ token, role: user.role });
  } catch (err) {
    console.error('Error in user login:', err.message);  // <-- log the actual error
    res.status(500).json({ msg: 'Server error', error: err.message });  // <-- include detailed error in response
  }
};
