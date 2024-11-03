const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');

router.post('/', rolePermissionController.createRolePermission);
router.get('/', rolePermissionController.getRolePermissions);

module.exports = router;
