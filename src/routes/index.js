const express = require('express');
const router = express.Router();

const chapterRoutes = require('./chapter');
const chapterAccountRoutes = require('./chapterAccount');
const commentRoutes = require('./comment');
const eventRoutes = require('./event');
const likeRoutes = require('./like');
const messageRoutes = require('./message');
const notificationRoutes = require('./notification');
const organizationRoutes = require('./organization');
const organizationAccountRoutes = require('./organizationAccount');
const permissionRoutes = require('./permission');
const postRoutes = require('./post');
const roleRoutes = require('./role');
const rolePermissionRoutes = require('./rolePermission');
const memberRoutes = require('./member');
const memberAccountRoutes = require('./memberAccount');
const friendshipRoutes = require('./friendship');

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
