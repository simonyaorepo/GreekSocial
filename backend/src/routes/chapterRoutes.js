const express = require('express');
const router = express.Router();
const { chapterController } = require('../controllers');
// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all chapter routes
// Best practice: Add Swagger docs and input validation at the route level

router.post('/', chapterController.createChapter); // TODO: add checkPermission('chapter:create')
router.get('/', chapterController.getAllChapters);
router.get('/:id', chapterController.getChapterById);
router.put('/:id', chapterController.updateChapter); // TODO: add checkPermission('chapter:update')
router.delete('/:id', chapterController.deleteChapter); // TODO: add checkPermission('chapter:delete')

module.exports = router;
