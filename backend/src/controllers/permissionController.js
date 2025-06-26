const { body, validationResult, param, query } = require('express-validator');
const permissionService = require('../services/permissionService');
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

const validatePermission = [
  body('name').isString().notEmpty().withMessage('Permission name is required'),
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

const validatePermissionId = [
  param('id').isInt({ min: 1 }).withMessage('Permission ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createPermission = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('permission:create'),
  ...validatePermission,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'description'];
      const permissionData = whitelistFields(req.body, allowedFields);
      const permission = await permissionService.createPermissionService(permissionData);
      res.status(201).json(permission);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await permissionService.getAllPermissionsService();
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};

exports.getPermissionById = [
  ...validatePermissionId,
  async (req, res, next) => {
    try {
      const permission = await permissionService.getPermissionByIdService(req.params.id);
      if (!permission) return res.status(404).json({ message: "Permission not found" });
      res.status(200).json(permission);
    } catch (error) {
      next(error);
    }
  }
];

exports.updatePermission = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('permission:update'),
  ...validatePermissionId,
  ...validatePermission,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'description'];
      const permissionData = whitelistFields(req.body, allowedFields);
      const updatedPermission = await permissionService.updatePermissionService(req.params.id, permissionData);
      res.status(200).json(updatedPermission);
    } catch (error) {
      next(error);
    }
  }
];

exports.deletePermission = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('permission:delete'),
  ...validatePermissionId,
  async (req, res, next) => {
    try {
      await permissionService.deletePermissionService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
