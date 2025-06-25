const { body, validationResult, param, query } = require('express-validator');
const roleService = require('../services/roleService');
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

const validateRole = [
  body('name').isString().notEmpty().withMessage('Role name is required'),
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

const validateRoleId = [
  param('id').isInt({ min: 1 }).withMessage('Role ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createRole = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('role:create'),
  ...validateRole,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'description'];
      const roleData = whitelistFields(req.body, allowedFields);
      const role = await roleService.createRoleService(roleData);
      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getAllRolesService();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

exports.getRoleById = [
  ...validateRoleId,
  async (req, res, next) => {
    try {
      const role = await roleService.getRoleByIdService(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateRole = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('role:update'),
  ...validateRoleId,
  ...validateRole,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'description'];
      const roleData = whitelistFields(req.body, allowedFields);
      const updatedRole = await roleService.updateRoleService(req.params.id, roleData);
      res.status(200).json(updatedRole);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteRole = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('role:delete'),
  ...validateRoleId,
  async (req, res, next) => {
    try {
      await roleService.deleteRoleService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
