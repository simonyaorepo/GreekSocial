const express = require('express');
const app = express();

// Import routes
const chapterRoutes = require('./src/routes/chapterRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const likeRoutes = require('./src/routes/likeRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const organizationRoutes = require('./src/routes/organizationRoutes');
const permissionRoutes = require('./src/routes/permissionRoutes');
const postRoutes = require('./src/routes/postRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const rolePermissionRoutes = require('./src/routes/rolePermissionRoutes');

// Middleware
app.use(express.json());

// Route setup
app.use('/api/chapters', chapterRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/role-permissions', rolePermissionRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});