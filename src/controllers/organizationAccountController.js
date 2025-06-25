const organizationAccountService = require('../services/organizationAccountService');

exports.createOrganizationAccount = async (req, res) => {
  try {
    const organizationAccount = await organizationAccountService.createOrganizationAccountService(req.body);
    res.status(201).json(organizationAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrganizationAccounts = async (req, res) => {
  try {
    const organizationAccounts = await organizationAccountService.getAllOrganizationAccountsService();
    res.status(200).json(organizationAccounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrganizationAccountById = async (req, res) => {
  try {
    const organizationAccount = await organizationAccountService.getOrganizationAccountByIdService(req.params.id);
    if (!organizationAccount) return res.status(404).json({ message: "OrganizationAccount not found" });
    res.status(200).json(organizationAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrganizationAccount = async (req, res) => {
  try {
    const updatedOrganizationAccount = await organizationAccountService.updateOrganizationAccountService(req.params.id, req.body);
    res.status(200).json(updatedOrganizationAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrganizationAccount = async (req, res) => {
  try {
    await organizationAccountService.deleteOrganizationAccountService(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Assign a role to an organization account
exports.assignRole = async (req, res) => {
  try {
    const { organization_account_id, role_id } = req.body;
    await organizationAccountService.assignRoleToAccount(organization_account_id, role_id);
    res.status(201).json({ message: 'Role assigned to organization account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a role from an organization account
exports.removeRole = async (req, res) => {
  try {
    const { organization_account_id, role_id } = req.body;
    await organizationAccountService.removeRoleFromAccount(organization_account_id, role_id);
    res.status(200).json({ message: 'Role removed from organization account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles for an organization account
exports.getRoles = async (req, res) => {
  try {
    const { organization_account_id } = req.params;
    const roles = await organizationAccountService.getRolesForAccount(organization_account_id);
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all permissions for an organization account (aggregated from roles)
exports.getPermissions = async (req, res) => {
  try {
    const { organization_account_id } = req.params;
    const permissions = await organizationAccountService.getPermissionsForAccount(organization_account_id);
    res.status(200).json(permissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
