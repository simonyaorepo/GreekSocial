// tagRoutes.js
const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all tag routes

// CRUD
router.post('/', tagController.create); // TODO: add checkPermission('tag:create')
router.get('/', tagController.getAll);
router.get('/:id', tagController.getById);
router.put('/:id', tagController.update); // TODO: add checkPermission('tag:update')
router.delete('/:id', tagController.delete); // TODO: add checkPermission('tag:delete')

// Assignment
router.post('/assign', tagController.assignTag); // TODO: add permission check
router.post('/remove', tagController.removeTag); // TODO: add permission check
router.get('/:entity/:entityId/tags', tagController.getTagsFor);

// Best practice: Add Swagger docs and input validation at the route level
module.exports = router;
