const { body, validationResult, param, query } = require('express-validator');
const notificationService = require('../services/notificationService');
// Best practice: Add authentication and permission middleware to protect sensitive routes
// Example: const { authenticateJWT, checkPermission } = require('../middleware/authMiddleware');

// Field whitelisting helper to prevent unwanted fields
const whitelistFields = (body, allowedFields) => {
  const filtered = {};
  allowedFields.forEach(field => {
    if (body[field] !== undefined) filtered[field] = body[field];
  });
  return filtered;
};

const validateNotification = [
  body('member_id').isInt({ min: 1 }).withMessage('member_id is required and must be a positive integer'),
  body('content').isString().notEmpty().withMessage('Content is required'),
  body('read').optional().isBoolean(),
  (req, res, next) => {
    const allowedFields = ['member_id', 'content', 'read'];
    Object.keys(req.body).forEach(key => {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({ errors: [{ msg: `Unexpected field: ${key}` }] });
      }
    });
    next();
  },
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateNotificationId = [
  param('id').isInt({ min: 1 }).withMessage('Notification ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createNotification = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('notification:create'),
  ...validateNotification,
  async (req, res, next) => {
    try {
      const allowedFields = ['member_id', 'content', 'read'];
      const notificationData = whitelistFields(req.body, allowedFields);
      const notification = await notificationService.createNotificationService(notificationData);
      res.status(201).json(notification);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getAllNotificationsService();
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

exports.getNotificationById = [
  ...validateNotificationId,
  async (req, res, next) => {
    try {
      const notification = await notificationService.getNotificationByIdService(req.params.id);
      if (!notification) return res.status(404).json({ message: "Notification not found" });
      res.status(200).json(notification);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateNotification = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('notification:update'),
  ...validateNotificationId,
  ...validateNotification,
  async (req, res, next) => {
    try {
      const allowedFields = ['member_id', 'content', 'read'];
      const notificationData = whitelistFields(req.body, allowedFields);
      const updatedNotification = await notificationService.updateNotificationService(req.params.id, notificationData);
      res.status(200).json(updatedNotification);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteNotification = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('notification:delete'),
  ...validateNotificationId,
  async (req, res, next) => {
    try {
      await notificationService.deleteNotificationService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
