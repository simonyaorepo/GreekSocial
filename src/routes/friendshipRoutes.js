const express = require('express');
const router = express.Router();
const controller = require('../controllers/friendshipController');

router.post('/', controller.createFriendship);
router.get('/', controller.getAllFriendships);
router.delete('/:id', controller.deleteFriendship);

module.exports = router;