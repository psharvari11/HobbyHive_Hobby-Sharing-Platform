// controllers/groupController.js
const Group = require('../models/Group.js');

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, description, hobby } = req.body;

    // Check if group name is unique
    const existing = await Group.findOne({ name });
    if (existing) return res.status(400).json({ msg: 'Group name already taken' });

    const group = new Group({
      name,
      description,
      hobby,
      admin: req.user,
      members: [req.user],
    });

    await group.save();

    res.status(201).json({ msg: 'Group created!', group });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Join a group
exports.joinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ msg: 'Group not found' });

    if (group.members.includes(req.user)) {
      return res.status(400).json({ msg: 'Already a member' });
    }

    group.members.push(req.user);
    await group.save();

    res.json({ msg: 'Joined group', group });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Leave a group
exports.leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ msg: 'Group not found' });

    if (!group.members.includes(req.user)) {
      return res.status(400).json({ msg: 'Not a member' });
    }

    // Prevent admin from leaving without transferring admin rights
    if (group.admin.toString() === req.user) {
      return res.status(400).json({ msg: 'Admin cannot leave the group without transferring admin rights' });
    }

    group.members = group.members.filter(member => member.toString() !== req.user);
    await group.save();

    res.json({ msg: 'Left group', group });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Post announcement (admin only)
exports.postAnnouncement = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { message } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ msg: 'Group not found' });

    if (group.admin.toString() !== req.user) {
      return res.status(403).json({ msg: 'Only admin can post announcements' });
    }

    group.announcements.push({ message });
    await group.save();

    res.json({ msg: 'Announcement posted', announcements: group.announcements });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Share resource in group
exports.shareResource = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { title, url, description } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ msg: 'Group not found' });

    if (!group.members.includes(req.user)) {
      return res.status(403).json({ msg: 'Only group members can share resources' });
    }

    group.resources.push({
      title,
      url,
      description,
      uploadedBy: req.user,
    });

    await group.save();

    res.json({ msg: 'Resource shared', resources: group.resources });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get group details including members, announcements, and resources
exports.getGroupDetails = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate('admin', 'username email')
      .populate('members', 'username email')
      .populate('resources.uploadedBy', 'username');

    if (!group) return res.status(404).json({ msg: 'Group not found' });

    res.json({ group });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
