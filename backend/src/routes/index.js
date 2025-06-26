const express = require('express');
const router = express.Router();

const commentRoutes = require('./commentRoutes');
const eventRoutes = require('./eventRoutes');
const likeRoutes = require('./likeRoutes');
const messageRoutes = require('./messageRoutes');
const notificationRoutes = require('./notificationRoutes');
const permissionRoutes = require('./permissionRoutes');
const postRoutes = require('./postRoutes');
const roleRoutes = require('./roleRoutes');
const rolePermissionRoutes = require('./rolePermissionRoutes');
const friendshipRoutes = require('./friendshipRoutes');
const tagRoutes = require('./tagRoutes');
const accountRoutes = require('./accountRoutes');

router.use('/accounts', accountRoutes);
router.use('/comments', commentRoutes);
router.use('/events', eventRoutes);
router.use('/likes', likeRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);
router.use('/permissions', permissionRoutes);
router.use('/posts', postRoutes);
router.use('/roles', roleRoutes);
router.use('/role-permissions', rolePermissionRoutes);
router.use('/friendships', friendshipRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
