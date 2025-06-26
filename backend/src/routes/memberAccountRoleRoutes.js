// memberAccountRoleRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberAccountRoleController');

router.post('/assign', controller.assignRoleToMemberAccount);
router.post('/remove', controller.removeRoleFromMemberAccount);

module.exports = router;
