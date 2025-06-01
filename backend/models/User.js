const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: '' }, // store file path or URL
  hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' }],
  resetPasswordToken: String,
resetPasswordExpires: Date,

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
