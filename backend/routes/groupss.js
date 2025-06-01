// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const {
  createGroup,
  joinGroup,
  leaveGroup,
  postAnnouncement,
  shareResource,
  getGroupDetails,
} = require('../controllers/groupController');

router.post('/', authMiddleware, createGroup);
router.post('/:groupId/join', authMiddleware, joinGroup);
router.post('/:groupId/leave', authMiddleware, leaveGroup);
router.post('/:groupId/announcement', authMiddleware, postAnnouncement);
router.post('/:groupId/resource', authMiddleware, shareResource);
router.get('/:groupId', authMiddleware, getGroupDetails);

module.exports = router;
