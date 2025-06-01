const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ msg: `Welcome, user ID: ${req.user}` });
});

module.exports = router;
