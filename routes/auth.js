const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { PasswordUser } = require('../models');
const { generateJWT } = require('../utils/jwt');
const { authenticateJWT } = require('../middleware/authMiddleware');
const {
  unifiedInit,
  deviceStatus,
  linkDeviceToUser,
} = require('../controllers/deviceAuthController');

const router = express.Router();

router.post('/unified-init', unifiedInit);
router.get('/device-status', deviceStatus);

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    const { deviceCode } = req.query;
    await linkDeviceToUser(req.user._id, deviceCode);
    res.json({ success: true });
  }
);

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await PasswordUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new PasswordUser({ email, passwordHash });
    await newUser.save();

    // Generate a JWT token for the new user
    const token = generateJWT({ _id: newUser._id });

    // Return the token and user info (you may choose to exclude sensitive info)
    res.json({
      success: true,
      token: token,
      user: {
        email: newUser.email,
        _id: newUser._id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile', authenticateJWT, (req, res) => {
  res.json({
    message: 'Profile data',
    user: req.user, // The user data comes from the token
  });
});

module.exports = router;
