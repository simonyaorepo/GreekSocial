// organizationAccountRoleRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/organizationAccountRoleController');

router.post('/assign', controller.assignRoleToOrganizationAccount);
router.post('/remove', controller.removeRoleFromOrganizationAccount);

module.exports = router;
