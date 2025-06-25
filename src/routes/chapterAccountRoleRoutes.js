// chapterAccountRoleRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/chapterAccountRoleController');

router.post('/assign', controller.assignRoleToChapterAccount);
router.post('/remove', controller.removeRoleFromChapterAccount);

module.exports = router;
