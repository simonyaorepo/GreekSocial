const express = require('express');
const router = express.Router();

const chapterRoutes = require('./chapterRoutes');
const chapterAccountRoutes = require('./chapterAccountRoutes');
const commentRoutes = require('./commentRoutes');
const eventRoutes = require('./eventRoutes');
const likeRoutes = require('./likeRoutes');
const messageRoutes = require('./messageRoutes');
const notificationRoutes = require('./notificationRoutes');
const organizationRoutes = require('./organizationRoutes');
const organizationAccountRoutes = require('./organizationAccountRoutes');
const permissionRoutes = require('./permissionRoutes');
const postRoutes = require('./postRoutes');
const roleRoutes = require('./roleRoutes');
const rolePermissionRoutes = require('./rolePermissionRoutes');
const memberRoutes = require('./memberRoutes');
const memberAccountRoutes = require('./memberAccountRoutes');
const friendshipRoutes = require('./friendshipRoutes');

router.use('/chapters', chapterRoutes);
router.use('/chapter-accounts', chapterAccountRoutes);
router.use('/comments', commentRoutes);
router.use('/events', eventRoutes);
router.use('/likes', likeRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);
router.use('/organizations', organizationRoutes);
router.use('/organization-accounts', organizationAccountRoutes);
router.use('/permissions', permissionRoutes);
router.use('/posts', postRoutes);
router.use('/roles', roleRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use('/members', memberRoutes);
router.use('/member-accounts', memberAccountRoutes);
router.use('/friendships', friendshipRoutes);

module.exports = router;
