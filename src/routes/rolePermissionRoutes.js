const express = require('express');
const router = express.Router();
const { rolePermissionController } = require('../controllers');

router.post('/', rolePermissionController.createRolePermission);
router.get('/', rolePermissionController.getRolePermissions);
router.put('/:id', rolePermissionController.updateRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;
