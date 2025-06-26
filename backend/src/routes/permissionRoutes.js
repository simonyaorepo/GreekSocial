const express = require('express');
const router = express.Router();
const { permissionController } = require('../controllers');

// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all permission routes

// Best practice: Add Swagger docs and input validation at the route level

router.post('/', permissionController.createPermission);
router.get('/', permissionController.getPermissions);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
