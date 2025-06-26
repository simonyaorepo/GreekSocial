const express = require('express');
const router = express.Router();

// Removed missing/legacy chapterRoutes
const commentRoutes = require('./commentRoutes');
const eventRoutes = require('./eventRoutes');
const likeRoutes = require('./likeRoutes');
const messageRoutes = require('./messageRoutes');
const notificationRoutes = require('./notificationRoutes');
const organizationRoutes = require('./organizationRoutes');
const permissionRoutes = require('./permissionRoutes');
const postRoutes = require('./postRoutes');
const roleRoutes = require('./roleRoutes');
const rolePermissionRoutes = require('./rolePermissionRoutes');
const memberRoutes = require('./memberRoutes');
const friendshipRoutes = require('./friendshipRoutes');
const tagRoutes = require('./tagRoutes');
const accountRoutes = require('./accountRoutes');

router.use('/accounts', accountRoutes);
// router.use('/chapters', chapterRoutes); // Removed: file does not exist
router.use('/comments', commentRoutes);
router.use('/events', eventRoutes);
router.use('/likes', likeRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);
router.use('/organizations', organizationRoutes);
router.use('/permissions', permissionRoutes);
router.use('/posts', postRoutes);
router.use('/roles', roleRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use('/members', memberRoutes);
router.use('/friendships', friendshipRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
