const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberAccountController');

// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all member account routes

// Best practice: Add Swagger docs and input validation at the route level

router.post('/', controller.createMemberAccount);
router.get('/', controller.getAllMemberAccounts);
router.get('/:id', controller.getMemberAccountById);
router.put('/:id', controller.updateMemberAccount);
router.delete('/:id', controller.deleteMemberAccount);
router.post('/assign-role', controller.assignRole);
router.post('/remove-role', controller.removeRole);
router.get('/:member_account_id/roles', controller.getRoles);
router.get('/:member_account_id/permissions', controller.getPermissions);

module.exports = router;