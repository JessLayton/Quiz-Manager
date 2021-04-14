const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/userModel');

const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

router.post('/register', async (req, res) => {
  try {
    const {
      email, password, confirmPassword, username,
    } = req.body;
    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({ msg: 'Fields cannot be empty' });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'An account with this email already exists' });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'An account with this username already exists' });
    }
    if (!passwordCheck.test(password)) {
      return res.status(400).json({ msg: 'The password does not meet the criteria' });
    } if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '900s' },
    );
    return res.json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.user,
        role: savedUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Fields cannot be empty' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ msg: 'No account with this username has been registered' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '900s' });
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/tokenIsValid', auth, async (req, res) => {
  try {
    return res.status(200).json({ user: { id: req._id, username: req.user, role: req.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
