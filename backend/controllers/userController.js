const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken.js');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Register new user
exports.registerUser = async (req, res) => {
  const { username, email, password, bio } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
      bio,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({msg:"Registered!",
      token,
      user: {
        id: user._id,
        username,
        email,
        bio,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      msg:"Login Successfull!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email,
        bio: user.bio,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};



exports.logoutUser = async (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expiryDate = new Date(decoded.exp * 1000);

    const blacklistedToken = new BlacklistedToken({ token, expiresAt: expiryDate });
    await blacklistedToken.save();

    res.json({ msg: 'Logged out successfully' });
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
};





exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Create reset link
    const resetLink = `http://localhost:5000/api/users/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Click the link to reset your password: ${resetLink}`
    );

    res.json({ msg: "Reset link sent to email" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


exports.resetPassword = async (req, res) => {
  const resetToken = req.params.token;
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // not expired
    });

    if (!user) {
      return res.status(400).json({ msg: 'Token is invalid or has expired' });
    }

    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ msg: 'Password has been reset successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user; 

    const { bio, hobbies, profilePic } = req.body;

    const updateData = {};

    if (bio !== undefined) updateData.bio = bio;
    if (hobbies !== undefined) {
      updateData.hobbies = hobbies;
    }
    if (profilePic !== undefined) updateData.profilePic = profilePic;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true } 
    ).select('-password'); 
    if (!updatedUser) return res.status(404).json({ msg: 'User not found' });

    res.json({ msg: 'Profile updated!', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
