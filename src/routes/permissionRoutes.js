const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

router.post('/', permissionController.createPermission);
router.get('/', permissionController.getPermissions);

module.exports = router;
