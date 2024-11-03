const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

router.post('/', chapterController.createChapter);
router.get('/', chapterController.getChapters);

module.exports = router;
