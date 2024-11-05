const express = require('express');
const router = express.Router();
const { permissionController } = require('../controllers');

router.post('/', permissionController.createPermission);
router.get('/', permissionController.getPermissions);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
