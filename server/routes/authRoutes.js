// server/routes/authRoutes.js

const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    // *** ADD THIS CHECK ***
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // This sends a clean error instead of crashing
      return res.status(400).json("Email is already in use");
    }
    // *** END OF ADDED CHECK ***

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user (your model MUST have a default role of 'user')
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user
    const user = await newUser.save();
    res.status(201).json(user);

  } catch (err) {
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