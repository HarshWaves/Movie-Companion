const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ✅ SECRET check
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  console.error("JWT_SECRET missing in .env ❌");
  process.exit(1);
}

// ✅ SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 🔴 validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    // 🔴 check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "Signup successful ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    // 🔍 find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    // 🎟️ generate token
    const token = jwt.sign(
      { id: user._id },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;