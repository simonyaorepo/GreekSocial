const { body, validationResult, param, query } = require('express-validator');
const memberAccountService = require('../services/memberAccountService');
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

const validateMemberAccount = [
  body('member_id').isInt({ min: 1 }).withMessage('member_id is required and must be a positive integer'),
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isString().notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const allowedFields = ['member_id', 'username', 'email', 'password'];
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

const validateMemberAccountId = [
  param('id').isInt({ min: 1 }).withMessage('MemberAccount ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createMemberAccount = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('memberAccount:create'),
  ...validateMemberAccount,
  async (req, res, next) => {
    try {
      const allowedFields = ['member_id', 'username', 'email', 'password'];
      const memberAccountData = whitelistFields(req.body, allowedFields);
      const memberAccount = await memberAccountService.createMemberAccountService(memberAccountData);
      res.status(201).json(memberAccount);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllMemberAccounts = async (req, res, next) => {
  try {
    const memberAccounts = await memberAccountService.getAllMemberAccountsService();
    res.status(200).json(memberAccounts);
  } catch (error) {
    next(error);
  }
};

exports.getMemberAccountById = [
  ...validateMemberAccountId,
  async (req, res, next) => {
    try {
      const memberAccount = await memberAccountService.getMemberAccountByIdService(req.params.id);
      if (!memberAccount) return res.status(404).json({ message: "MemberAccount not found" });
      res.status(200).json(memberAccount);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateMemberAccount = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('memberAccount:update'),
  ...validateMemberAccountId,
  ...validateMemberAccount,
  async (req, res, next) => {
    try {
      const allowedFields = ['member_id', 'username', 'email', 'password'];
      const memberAccountData = whitelistFields(req.body, allowedFields);
      const updatedMemberAccount = await memberAccountService.updateMemberAccountService(req.params.id, memberAccountData);
      res.status(200).json(updatedMemberAccount);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteMemberAccount = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('memberAccount:delete'),
  ...validateMemberAccountId,
  async (req, res, next) => {
    try {
      await memberAccountService.deleteMemberAccountService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

exports.assignRole = async (req, res, next) => {
  try {
    const { member_account_id, role_id } = req.body;
    if (!member_account_id || !role_id) {
      return res.status(400).json({ message: 'member_account_id and role_id are required' });
    }
    // You should implement this service method to assign a role
    const result = await memberAccountService.assignRoleToMemberAccount(member_account_id, role_id);
    res.status(200).json({ message: 'Role assigned', result });
  } catch (error) {
    next(error);
  }
};

exports.removeRole = async (req, res, next) => {
  try {
    const { member_account_id, role_id } = req.body;
    if (!member_account_id || !role_id) {
      return res.status(400).json({ message: 'member_account_id and role_id are required' });
    }
    // You should implement this service method to remove a role
    const result = await memberAccountService.removeRoleFromMemberAccount(member_account_id, role_id);
    res.status(200).json({ message: 'Role removed', result });
  } catch (error) {
    next(error);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    const { member_account_id } = req.params;
    if (!member_account_id) {
      return res.status(400).json({ message: 'member_account_id is required' });
    }
    // You should implement this service method to get roles
    const roles = await memberAccountService.getRolesForMemberAccount(member_account_id);
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

exports.getPermissions = async (req, res, next) => {
  try {
    const { member_account_id } = req.params;
    if (!member_account_id) {
      return res.status(400).json({ message: 'member_account_id is required' });
    }
    // You should implement this service method to get permissions
    const permissions = await memberAccountService.getPermissionsForMemberAccount(member_account_id);
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
