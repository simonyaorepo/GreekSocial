// tagController.js
const { body, validationResult, param, query } = require('express-validator');
const tagService = require('../services/tagService');
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

const validateTag = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
  (req, res, next) => {
    const allowedFields = ['name', 'description'];
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

const validateTagId = [
  param('id').isInt({ min: 1 }).withMessage('Tag ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateTagQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Page size must be 1-100'),
  query('name').optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Standard CRUD exports matching your other controller formats
exports.createTag = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('tag:create'),
  ...validateTag,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'description'];
      const tagData = whitelistFields(req.body, allowedFields);
      const tag = await tagService.createTag(tagData);
      res.status(201).json(tag);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllTags = [
  ...validateTagQuery,
  async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const offset = (page - 1) * pageSize;
      const where = {};
      if (req.query.name) where.name = req.query.name;
      const { rows, count } = await tagService.getAllTags({ where, offset, limit: pageSize });
      res.json({ data: rows, total: count, page, pageSize });
    } catch (error) {
      next(error);
    }
  }
];

exports.getTagById = [
  ...validateTagId,
  async (req, res, next) => {
    try {
      const tag = await tagService.getTagById(req.params.id);
      if (!tag) return res.status(404).json({ error: 'Tag not found' });
      res.json(tag);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateTag = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('tag:update'),
  ...validateTagId,
  ...validateTag,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'description'];
      const tagData = whitelistFields(req.body, allowedFields);
      await tagService.updateTag(req.params.id, tagData);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteTag = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('tag:delete'),
  ...validateTagId,
  async (req, res, next) => {
    try {
      await tagService.deleteTag(req.params.id);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
];

// Assignment endpoints (add placeholder implementations if missing)
const validateTagAssignment = [
  body('entityType').isIn(['post', 'comment', 'member', 'chapter', 'organization']).withMessage('Invalid entityType'),
  body('entityId').isInt({ min: 1 }).withMessage('entityId must be a positive integer'),
  body('tagId').isInt({ min: 1 }).withMessage('tagId must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.assignTag = [
  ...validateTagAssignment,
  async (req, res, next) => {
    try {
      const { entityType, entityId, tagId } = req.body;
      // TODO: Implement this in tagService
      if (!tagService.assignTagToEntity) {
        return res.status(501).json({ message: 'Tag assignment service not implemented' });
      }
      await tagService.assignTagToEntity(entityType, entityId, tagId);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
];

exports.removeTag = [
  ...validateTagAssignment,
  async (req, res, next) => {
    try {
      const { entityType, entityId, tagId } = req.body;
      // TODO: Implement this in tagService
      if (!tagService.removeTagFromEntity) {
        return res.status(501).json({ message: 'Tag removal service not implemented' });
      }
      await tagService.removeTagFromEntity(entityType, entityId, tagId);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
];

const validateGetTagsFor = [
  query('entityType').isIn(['post', 'comment', 'member', 'chapter', 'organization']).withMessage('Invalid entityType'),
  query('entityId').isInt({ min: 1 }).withMessage('entityId must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.getTagsFor = [
  ...validateGetTagsFor,
  async (req, res, next) => {
    try {
      const { entityType, entityId } = req.query;
      // TODO: Implement this in tagService
      if (!tagService.getTagsForEntity) {
        return res.status(501).json({ message: 'Get tags for entity service not implemented' });
      }
      const tags = await tagService.getTagsForEntity(entityType, entityId);
      res.json({ tags });
    } catch (error) {
      next(error);
    }
  }
];

// Assignment endpoints and other tag logic would be similarly updated with validation and best practices
// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
