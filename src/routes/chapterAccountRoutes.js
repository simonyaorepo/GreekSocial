const express = require('express');
const router = express.Router();
const chapterAccountController = require('../controllers/chapterAccountController');

// Best practice: Add authentication, permission, and rate limiting middleware
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');
// router.use(authenticateJWT); // Uncomment to protect all chapter account routes

// Best practice: Add Swagger docs and input validation at the route level

router.post('/', chapterAccountController.createChapterAccount);
router.get('/', chapterAccountController.getAllChapterAccounts);
router.get('/:id', chapterAccountController.getChapterAccountById);
router.put('/:id', chapterAccountController.updateChapterAccount);
router.delete('/:id', chapterAccountController.deleteChapterAccount);
router.post('/assign-role', chapterAccountController.assignRole);
router.post('/remove-role', chapterAccountController.removeRole);
router.get('/:chapter_account_id/roles', chapterAccountController.getRoles);
router.get('/:chapter_account_id/permissions', chapterAccountController.getPermissions);

module.exports = router;
