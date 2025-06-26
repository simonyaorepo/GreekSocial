// organizationAccountRoleService.js
const { OrganizationAccountRole } = require('../models');

exports.assignRole = async (organization_account_id, role_id) => {
  // Only allow whitelisted fields
  return OrganizationAccountRole.create({ organization_account_id, role_id });
};

exports.removeRole = async (organization_account_id, role_id) => {
  // If paranoid: true, this will soft delete
  return OrganizationAccountRole.destroy({ where: { organization_account_id, role_id } });
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and audit logging for assign/remove actions
