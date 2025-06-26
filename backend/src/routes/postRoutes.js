const express = require('express');
const router = express.Router();
const { postController } = require('../controllers');
// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all post routes
// Best practice: Add Swagger docs and input validation at the route level

router.post('/', postController.createPost); // TODO: add checkPermission('post:create')
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost); // TODO: add checkPermission('post:update')
router.delete('/:id', postController.deletePost); // TODO: add checkPermission('post:delete')

module.exports = router;
