const { body, validationResult, param, query } = require('express-validator');
const memberService = require('../services/memberService');
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

const validateMember = [
  body('first_name').isString().notEmpty().withMessage('First name is required'),
  body('last_name').isString().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  // Add more fields as needed
  (req, res, next) => {
    const allowedFields = ['first_name', 'last_name', 'email', 'account'];
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

const validateMemberId = [
  param('id').isInt({ min: 1 }).withMessage('Member ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createMember = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('member:create'),
  ...validateMember,
  async (req, res, next) => {
    try {
      const allowedFields = ['first_name', 'last_name', 'email'];
      const memberData = whitelistFields(req.body, allowedFields);
      const member = await memberService.createMemberService(memberData);
      if (req.body.account) {
        const accountData = { member_id: member.id, ...req.body.account };
        await memberAccountService.createMemberAccountService(accountData);
      }
      res.status(201).json(member);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await memberService.getAllMembersService();
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

exports.getMemberById = [
  ...validateMemberId,
  async (req, res, next) => {
    try {
      const member = await memberService.getMemberByIdService(req.params.id);
      if (!member) return res.status(404).json({ message: "Member not found" });
      res.status(200).json(member);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateMember = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('member:update'),
  ...validateMemberId,
  ...validateMember,
  async (req, res, next) => {
    try {
      const allowedFields = ['first_name', 'last_name', 'email'];
      const memberData = whitelistFields(req.body, allowedFields);
      const updatedMember = await memberService.updateMemberService(req.params.id, memberData);
      if (req.body.account) {
        await memberAccountService.updateMemberAccountServiceByMemberId(req.params.id, req.body.account);
      }
      res.status(200).json(updatedMember);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteMember = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('member:delete'),
  ...validateMemberId,
  async (req, res, next) => {
    try {
      await memberAccountService.deleteMemberAccountServiceByMemberId(req.params.id);
      await memberService.deleteMemberService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
