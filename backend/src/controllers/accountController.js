// accountController.js
const { body, validationResult, param } = require('express-validator');
const accountService = require('../services/accountService');
const memberAccountService = require('../services/memberAccountService');
const chapterAccountService = require('../services/chapterAccountService');
const organizationAccountService = require('../services/organizationAccountService');

// Field whitelisting helper
const whitelistFields = (body, allowedFields) => {
  const filtered = {};
  allowedFields.forEach(field => {
    if (body[field] !== undefined) filtered[field] = body[field];
  });
  return filtered;
};

const validateAccount = [
  body('type').isIn(['member', 'chapter', 'organization']).withMessage('Invalid account type'),
  body('email').isEmail().withMessage('Valid email required'),
  // Add more validations as needed
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateAccountId = [
  param('id').isInt({ min: 1 }).withMessage('Account ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createAccount = [
  ...validateAccount,
  async (req, res, next) => {
    try {
      const allowedFields = ['type', 'email', 'password'];
      const accountData = whitelistFields(req.body, allowedFields);
      const account = await accountService.createAccount(accountData);
      // Create detail record
      if (account.type === 'member' && req.body.member) {
        await memberAccountService.createMemberAccount({ account_id: account.id, ...req.body.member });
      } else if (account.type === 'chapter' && req.body.chapter) {
        await chapterAccountService.createChapterAccount({ account_id: account.id, ...req.body.chapter });
      } else if (account.type === 'organization' && req.body.organization) {
        await organizationAccountService.createOrganizationAccount({ account_id: account.id, ...req.body.organization });
      }
      res.status(201).json(account);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAccountById = [
  ...validateAccountId,
  async (req, res, next) => {
    try {
      const account = await accountService.getAccountById(req.params.id);
      if (!account) return res.status(404).json({ message: 'Account not found' });
      res.json(account);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateAccount = [
  ...validateAccountId,
  ...validateAccount,
  async (req, res, next) => {
    try {
      const allowedFields = ['type', 'email', 'password'];
      const accountData = whitelistFields(req.body, allowedFields);
      const updated = await accountService.updateAccount(req.params.id, accountData);
      // Update detail record
      if (req.body.member) {
        await memberAccountService.updateMemberAccountByAccountId(req.params.id, req.body.member);
      } else if (req.body.chapter) {
        await chapterAccountService.updateChapterAccountByAccountId(req.params.id, req.body.chapter);
      } else if (req.body.organization) {
        await organizationAccountService.updateOrganizationAccountByAccountId(req.params.id, req.body.organization);
      }
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteAccount = [
  ...validateAccountId,
  async (req, res, next) => {
    try {
      await memberAccountService.deleteMemberAccountByAccountId(req.params.id);
      await chapterAccountService.deleteChapterAccountByAccountId(req.params.id);
      await organizationAccountService.deleteOrganizationAccountByAccountId(req.params.id);
      await accountService.deleteAccount(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Add more endpoints as needed (login, assign role, etc.)
