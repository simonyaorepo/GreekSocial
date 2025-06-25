const express = require('express');
const router = express.Router();
const controller = require('../controllers/friendshipController');

// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all friendship routes

// Best practice: Add Swagger docs and input validation at the route level

router.post('/', controller.createFriendship);
router.get('/', controller.getAllFriendships);
router.get('/:id', controller.getFriendshipById);
router.delete('/:id', controller.deleteFriendship);

module.exports = router;