const express = require('express');
const router = express.Router();
const { memberController } = require('../controllers');
// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all member routes
// Best practice: Add Swagger docs and input validation at the route level

router.post('/', memberController.createMember); // TODO: add checkPermission('member:create')
router.get('/', memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);
router.put('/:id', memberController.updateMember); // TODO: add checkPermission('member:update')
router.delete('/:id', memberController.deleteMember); // TODO: add checkPermission('member:delete')

module.exports = router;
