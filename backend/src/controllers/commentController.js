const { body, validationResult, param, query } = require('express-validator');
const commentService = require('../services/commentService');
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

// Validation middleware for comment creation and update
const validateComment = [
  body('content').isString().notEmpty().withMessage('Content is required'),
  body('post_id').isInt({ min: 1 }).withMessage('post_id is required and must be a positive integer'),
  body('member_id').isInt({ min: 1 }).withMessage('member_id is required and must be a positive integer'),
  (req, res, next) => {
    const allowedFields = ['content', 'post_id', 'member_id'];
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

const validateCommentId = [
  param('id').isInt({ min: 1 }).withMessage('Comment ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateCommentQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Page size must be 1-100'),
  query('post_id').optional().isInt({ min: 1 }),
  query('member_id').optional().isInt({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createComment = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('comment:create'),
  ...validateComment,
  async (req, res, next) => {
    try {
      const allowedFields = ['content', 'post_id', 'member_id'];
      const commentData = whitelistFields(req.body, allowedFields);
      const comment = await commentService.createCommentService(commentData);
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllComments = [
  ...validateCommentQuery,
  async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const offset = (page - 1) * pageSize;
      const where = {};
      if (req.query.post_id) where.post_id = req.query.post_id;
      if (req.query.member_id) where.member_id = req.query.member_id;
      const { rows, count } = await commentService.getAllComments({ where, offset, limit: pageSize });
      // Only return non-deleted comments if paranoid is enabled
      // Sequelize handles this automatically if paranoid: true
      res.json({ data: rows, total: count, page, pageSize });
    } catch (error) {
      next(error);
    }
  }
];

exports.getCommentById = [
  ...validateCommentId,
  async (req, res, next) => {
    try {
      const comment = await commentService.getCommentByIdService(req.params.id);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateComment = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('comment:update'),
  ...validateCommentId,
  ...validateComment,
  async (req, res, next) => {
    try {
      const allowedFields = ['content', 'post_id', 'member_id'];
      const commentData = whitelistFields(req.body, allowedFields);
      const updatedComment = await commentService.updateCommentService(req.params.id, commentData);
      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteComment = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('comment:delete'),
  ...validateCommentId,
  async (req, res, next) => {
    try {
      await commentService.deleteCommentService(req.params.id);
      // If using soft deletes, consider returning 200 with a message
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
