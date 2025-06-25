// memberRoleRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberRoleController');

router.post('/assign', controller.assignRoleToMember);
router.post('/remove', controller.removeRoleFromMember);

module.exports = router;
