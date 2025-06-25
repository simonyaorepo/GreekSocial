const express = require('express');
const router = express.Router();
const controller = require('../controllers/friendshipController');

router.post('/', controller.createFriendship);
router.get('/', controller.getAllFriendships);
router.get('/:id', controller.getFriendshipById);
router.delete('/:id', controller.deleteFriendship);

module.exports = router;