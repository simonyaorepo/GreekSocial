const express = require('express');
const router = express.Router();
const controller = require('../controllers/organizationAccountController');

// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all organization account routes

// Best practice: Add Swagger docs and input validation at the route level

router.post('/', controller.createOrganizationAccount);
router.get('/', controller.getAllOrganizationAccounts);
router.get('/:id', controller.getOrganizationAccountById);
router.put('/:id', controller.updateOrganizationAccount);
router.delete('/:id', controller.deleteOrganizationAccount);
router.post('/assign-role', controller.assignRole);
router.post('/remove-role', controller.removeRole);
router.get('/:organization_account_id/roles', controller.getRoles);
router.get('/:organization_account_id/permissions', controller.getPermissions);

module.exports = router;