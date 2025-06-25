const { body, validationResult, param, query } = require('express-validator');
const messageService = require('../services/messageService');
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

const validateMessage = [
  body('sender_id').isInt({ min: 1 }).withMessage('sender_id is required and must be a positive integer'),
  body('receiver_id').isInt({ min: 1 }).withMessage('receiver_id is required and must be a positive integer'),
  body('content').isString().notEmpty().withMessage('Content is required'),
  (req, res, next) => {
    const allowedFields = ['sender_id', 'receiver_id', 'content'];
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

const validateMessageId = [
  param('id').isInt({ min: 1 }).withMessage('Message ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createMessage = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('message:create'),
  ...validateMessage,
  async (req, res, next) => {
    try {
      const allowedFields = ['sender_id', 'receiver_id', 'content'];
      const messageData = whitelistFields(req.body, allowedFields);
      const message = await messageService.createMessageService(messageData);
      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getAllMessagesService();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

exports.getMessageById = [
  ...validateMessageId,
  async (req, res, next) => {
    try {
      const message = await messageService.getMessageByIdService(req.params.id);
      if (!message) return res.status(404).json({ message: "Message not found" });
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateMessage = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('message:update'),
  ...validateMessageId,
  ...validateMessage,
  async (req, res, next) => {
    try {
      const allowedFields = ['sender_id', 'receiver_id', 'content'];
      const messageData = whitelistFields(req.body, allowedFields);
      const updatedMessage = await messageService.updateMessageService(req.params.id, messageData);
      res.status(200).json(updatedMessage);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteMessage = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('message:delete'),
  ...validateMessageId,
  async (req, res, next) => {
    try {
      await messageService.deleteMessageService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
