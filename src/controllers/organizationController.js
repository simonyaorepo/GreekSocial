const { body, validationResult, param, query } = require('express-validator');
const organizationService = require('../services/organizationService');
const organizationAccountService = require('../services/organizationAccountService');
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

const validateOrganization = [
  body('name').isString().notEmpty().withMessage('Organization name is required'),
  body('type').optional().isString(),
  // Add more fields as needed
  (req, res, next) => {
    const allowedFields = ['name', 'type', 'account'];
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

const validateOrganizationId = [
  param('id').isInt({ min: 1 }).withMessage('Organization ID must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.createOrganization = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('organization:create'),
  ...validateOrganization,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'type'];
      const organizationData = whitelistFields(req.body, allowedFields);
      const organization = await organizationService.createOrganizationService(organizationData);
      if (req.body.account) {
        const accountData = { organization_id: organization.id, ...req.body.account };
        await organizationAccountService.createOrganizationAccountService(accountData);
      }
      res.status(201).json(organization);
    } catch (error) {
      next(error);
    }
  }
];

exports.getAllOrganizations = async (req, res, next) => {
  try {
    const organizations = await organizationService.getAllOrganizationsService();
    res.status(200).json(organizations);
  } catch (error) {
    next(error);
  }
};

exports.getOrganizationById = [
  ...validateOrganizationId,
  async (req, res, next) => {
    try {
      const organization = await organizationService.getOrganizationByIdService(req.params.id);
      if (!organization) return res.status(404).json({ message: "Organization not found" });
      res.status(200).json(organization);
    } catch (error) {
      next(error);
    }
  }
];

exports.updateOrganization = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('organization:update'),
  ...validateOrganizationId,
  ...validateOrganization,
  async (req, res, next) => {
    try {
      const allowedFields = ['name', 'type'];
      const organizationData = whitelistFields(req.body, allowedFields);
      const updatedOrganization = await organizationService.updateOrganizationService(req.params.id, organizationData);
      if (req.body.account) {
        await organizationAccountService.updateOrganizationAccountServiceByOrganizationId(req.params.id, req.body.account);
      }
      res.status(200).json(updatedOrganization);
    } catch (error) {
      next(error);
    }
  }
];

exports.deleteOrganization = [
  // TODO: Add authentication and permission middleware here
  // authenticateJWT, checkPermission('organization:delete'),
  ...validateOrganizationId,
  async (req, res, next) => {
    try {
      await organizationAccountService.deleteOrganizationAccountServiceByOrganizationId(req.params.id);
      await organizationService.deleteOrganizationService(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
];

// Best practice: Add rate limiting and restrict CORS in production (see app.js/server.js)
// Best practice: Add logging (e.g., winston, morgan) and health check endpoints
