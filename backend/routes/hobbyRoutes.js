const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware.js');
const {
  createHobby,
  getAllHobbies,
  getHobbyById,
  updateHobby,
  deleteHobby
} = require('../controllers/hobbyController.js');

router.post('/', auth, createHobby);
router.get('/', getAllHobbies);
router.get('/:id', getHobbyById);
router.put('/:id', auth, updateHobby);
router.delete('/:id', auth, deleteHobby);

module.exports = router;

