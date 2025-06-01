const Hobby = require('../models/Hobby.js');

exports.createHobby = async (req, res) => {
  try {
    const { name, description, skillLevel } = req.body;
    const hobby = new Hobby({ name, description, skillLevel, createdBy: req.user });
    await hobby.save();
    res.status(201).json({ msg: 'Hobby created', hobby });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

exports.getAllHobbies = async (req, res) => {
  try {
    const hobbies = await Hobby.find();
    res.json(hobbies);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getHobbyById = async (req, res) => {
  try {
    const hobby = await Hobby.findById(req.params.id);
    if (!hobby) return res.status(404).json({ msg: 'Hobby not found' });
    res.json(hobby);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateHobby = async (req, res) => {
  try {
    const hobby = await Hobby.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hobby) return res.status(404).json({ msg: 'Hobby not found' });
    res.json({ msg: 'Hobby updated', hobby });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteHobby = async (req, res) => {
  try {
    const hobby = await Hobby.findByIdAndDelete(req.params.id);
    if (!hobby) return res.status(404).json({ msg: 'Hobby not found' });
    res.json({ msg: 'Hobby deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
