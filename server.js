const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Your DB connection setup
const userRoutes = require('./routes/userRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const eventRoutes = require('./routes/eventRoutes');
// Import other routes (repeat this for all 12 routes)
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
// Add any other routes (e.g., members, invitations, etc.)
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reportRoutes = require('./routes/reportRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminPanelRoutes = require('./routes/adminPanelRoutes');

const errorHandler = require('./utils/errorHandler'); // Error handling middleware
const app = express();

// Environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Body parsing middleware

// Routes
app.use('/api/users', userRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/events', eventRoutes);
// Use the additional routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
// Include other routes (you can organize the routes as needed)
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/adminpanel', adminPanelRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
