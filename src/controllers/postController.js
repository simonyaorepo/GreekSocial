const { body, validationResult, param, query } = require('express-validator');
const postService = require('../services/postService');
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

// Validation middleware for post creation and update
const validatePost = [
  body('content').isString().notEmpty().withMessage('Content is required'),
  body('member_id').isInt({ min: 1 }).withMessage('member_id is required and must be a positive integer'),
  body('chapter_id').optional().isInt({ min: 1 }),
  body('organization_id').optional().isInt({ min: 1 }),
  (req, res, next) => {
    const allowedFields = ['content', 'member_id', 'chapter_id', 'organization_id'];
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

const validatePostId = [
  param('id').isInt({ min: 1 }).withMessage('Post ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validatePostQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Page size must be 1-100'),
  query('member_id').optional().isInt({ min: 1 }),
  query('chapter_id').optional().isInt({ min: 1 }),
  query('organization_id').optional().isInt({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createPost = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('post:create'),
  ...validatePost,
  async (req, res, next) => {
    try {
      const allowedFields = ['content', 'member_id', 'chapter_id', 'organization_id'];
      const postData = whitelistFields(req.body, allowedFields);
      const post = await postService.createPostService(postData);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllPosts = [
  ...validatePostQuery,
  async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const offset = (page - 1) * pageSize;
      const where = {};
      if (req.query.member_id) where.member_id = req.query.member_id;
      if (req.query.chapter_id) where.chapter_id = req.query.chapter_id;
      if (req.query.organization_id) where.organization_id = req.query.organization_id;
      const { rows, count } = await postService.getAllPosts({ where, offset, limit: pageSize });
      // Only return non-deleted posts if paranoid is enabled
      // Sequelize handles this automatically if paranoid: true
      res.json({ data: rows, total: count, page, pageSize });
    } catch (error) {
      next(error);
    }
  }
];

exports.getPostById = [
  ...validatePostId,
  async (req, res, next) => {
    try {
      const post = await postService.getPostByIdService(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
];

exports.updatePost = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('post:update'),
  ...validatePostId,
  ...validatePost,
  async (req, res, next) => {
    try {
      const allowedFields = ['content', 'member_id', 'chapter_id', 'organization_id'];
      const postData = whitelistFields(req.body, allowedFields);
      const updatedPost = await postService.updatePostService(req.params.id, postData);
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
];

exports.deletePost = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('post:delete'),
  ...validatePostId,
  async (req, res, next) => {
    try {
      await postService.deletePostService(req.params.id);
      // If using soft deletes, consider returning 200 with a message
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
