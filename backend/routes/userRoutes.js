const express = require('express');
const router = express.Router();
const User = require("../models/User.js")
const { registerUser, loginUser, forgotPassword, logoutUser, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post("/logout", authMiddleware ,logoutUser)
router.put('/profile', authMiddleware, updateProfile);

// router.get('/profile', authMiddleware, (req, res) => {
//   res.json({ msg: `Welcome, user ID: ${req.user.username}` });
// });

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password -resetPasswordToken -resetPasswordExpires');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      msg: 'Profile fetched successfully!',
      user
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
