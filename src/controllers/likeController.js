const { body, validationResult, param, query } = require('express-validator');
const likeService = require('../services/likeService');
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

const validateLike = [
  body('member_id').isInt({ min: 1 }).withMessage('member_id is required and must be a positive integer'),
  body('likeable_id').isInt({ min: 1 }).withMessage('likeable_id is required and must be a positive integer'),
  body('likeable_type').isString().notEmpty().withMessage('likeable_type is required'),
  (req, res, next) => {
    const allowedFields = ['member_id', 'likeable_id', 'likeable_type'];
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

const validateLikeId = [
  param('id').isInt({ min: 1 }).withMessage('Like ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createLike = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('like:create'),
  ...validateLike,
  async (req, res, next) => {
    try {
      const allowedFields = ['member_id', 'likeable_id', 'likeable_type'];
      const likeData = whitelistFields(req.body, allowedFields);
      const like = await likeService.createLikeService(likeData);
      res.status(201).json(like);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllLikes = async (req, res, next) => {
  try {
    const likes = await likeService.getAllLikesService();
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};

exports.deleteLike = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('like:delete'),
  ...validateLikeId,
  async (req, res, next) => {
    try {
      await likeService.deleteLikeService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
