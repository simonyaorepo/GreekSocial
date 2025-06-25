const { body, validationResult, param, query } = require('express-validator');
const friendshipService = require('../services/friendshipService');
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

const validateFriendship = [
  body('member_id_1').isInt({ min: 1 }).withMessage('member_id_1 is required and must be a positive integer'),
  body('member_id_2').isInt({ min: 1 }).withMessage('member_id_2 is required and must be a positive integer'),
  (req, res, next) => {
    const allowedFields = ['member_id_1', 'member_id_2'];
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

const validateFriendshipId = [
  param('id').isInt({ min: 1 }).withMessage('Friendship ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createFriendship = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('friendship:create'),
  ...validateFriendship,
  async (req, res, next) => {
    try {
      const allowedFields = ['member_id_1', 'member_id_2'];
      const friendshipData = whitelistFields(req.body, allowedFields);
      const friendship = await friendshipService.createFriendshipService(friendshipData);
      res.status(201).json(friendship);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllFriendships = async (req, res, next) => {
  try {
    const friendships = await friendshipService.getAllFriendshipsService();
    res.status(200).json(friendships);
  } catch (error) {
    next(error);
  }
};

exports.getFriendshipById = [
  ...validateFriendshipId,
  async (req, res, next) => {
    try {
      const friendship = await friendshipService.getFriendshipByIdService(req.params.id);
      if (!friendship) return res.status(404).json({ message: "Friendship not found" });
      res.status(200).json(friendship);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteFriendship = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('friendship:delete'),
  ...validateFriendshipId,
  async (req, res, next) => {
    try {
      await friendshipService.deleteFriendshipService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
