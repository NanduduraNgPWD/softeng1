require('dotenv').config(); // Load environment variables

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

// Create a JWT token using the secret key stored in .env
const token = jwt.sign(
  { 
    user_id: user.user_id,     // User's unique ID, useful for identifying the user
    email: user.email,         // User's email, often used for user identification or verification
    user_type: user.user_type  // User's type (e.g., 'Customer' or 'Business'), used for role-based access
  },
  process.env.JWT_SECRET,       // The secret key stored in your .env file for signing the token
  { expiresIn: '1h' }           // Token's expiration time; 1 hour in this case
);

    // Return the token to the frontend
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
