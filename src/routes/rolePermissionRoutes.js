const express = require('express');
const router = express.Router();
const { rolePermissionController } = require('../controllers');

router.post('/', rolePermissionController.createRolePermission);
router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;
