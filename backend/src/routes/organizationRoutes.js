const express = require('express');
const router = express.Router();
const { organizationController } = require('../controllers');
// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all organization routes
// Best practice: Add Swagger docs and input validation at the route level

router.post('/', organizationController.createOrganization); // TODO: add checkPermission('organization:create')
router.get('/', organizationController.getAllOrganizations);
router.get('/:id', organizationController.getOrganizationById);
router.put('/:id', organizationController.updateOrganization); // TODO: add checkPermission('organization:update')
router.delete('/:id', organizationController.deleteOrganization); // TODO: add checkPermission('organization:delete')

module.exports = router;
