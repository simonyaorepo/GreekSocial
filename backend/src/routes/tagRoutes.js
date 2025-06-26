// tagRoutes.js
const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all tag routes

// CRUD
router.post('/', tagController.createTag); // TODO: add checkPermission('tag:create')
router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTagById);
router.put('/:id', tagController.updateTag); // TODO: add checkPermission('tag:update')
router.delete('/:id', tagController.deleteTag); // TODO: add checkPermission('tag:delete')

// Assignment
router.post('/assign', tagController.assignTag); // TODO: add permission check
router.post('/remove', tagController.removeTag); // TODO: add permission check
router.get('/:entity/:entityId/tags', tagController.getTagsFor);

// Best practice: Add Swagger docs and input validation at the route level
module.exports = router;
