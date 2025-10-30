// server/routes/authRoutes.js

const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER A NEW USER
router.post('/register', async (req, res) => {
  // *** ADD THESE LINES FOR DEBUGGING ***
  console.log("Register route was hit");
  console.log("Data received:", req.body);
  // *** END OF DEBUGGING LINES ***

  try {
    const { email, password } = req.body; // Get email and password from the body

    // Check if email is empty or undefined
    if (!email) {
      return res.status(400).json("Email is required.");
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json("Email is already in use");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    // Save user
    const user = await newUser.save();
    res.status(201).json(user);

  } catch (err) {
    console.error(err); // Log the actual error
    res.status(500).json(err);
  }
});

// LOGIN (FOR BOTH USER AND ADMIN)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json('User not found!');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json('Wrong password!');
    }

    // *** IMPORTANT PART ***
    // Create a JWT token that includes the user's ID and their ROLE
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Make sure you have a JWT_SECRET in your .env
      { expiresIn: '3d' }
    );

    // Send back the user's info (without password) and the token
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;