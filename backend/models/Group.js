// models/Group.js
const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  hobby: { type: mongoose.Schema.Types.ObjectId, ref: 'Hobby', required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  announcements: [{
    message: String,
    date: { type: Date, default: Date.now },
  }],
  resources: [{
    title: String,
    url: String,
    description: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);
