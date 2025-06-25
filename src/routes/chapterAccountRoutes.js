const express = require('express');
const router = express.Router();
const chapterAccountController = require('../controllers/chapterAccountController');

router.post('/', chapterAccountController.createChapterAccount);
router.get('/', chapterAccountController.getAllChapterAccounts);
router.get('/:id', chapterAccountController.getChapterAccountById);
router.put('/:id', chapterAccountController.updateChapterAccount);
router.delete('/:id', chapterAccountController.deleteChapterAccount);

module.exports = router;
