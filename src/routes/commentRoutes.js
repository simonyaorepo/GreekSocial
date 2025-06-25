const express = require('express');
const router = express.Router();
const { commentController } = require('../controllers');
// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all comment routes
// Best practice: Add Swagger docs and input validation at the route level

router.post('/', commentController.createComment); // TODO: add checkPermission('comment:create')
router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.put('/:id', commentController.updateComment); // TODO: add checkPermission('comment:update')
router.delete('/:id', commentController.deleteComment); // TODO: add checkPermission('comment:delete')

module.exports = router;
