// organizationAccountRoleService.js
const { OrganizationAccountRole } = require('../models');

exports.assignRole = async (organization_account_id, role_id) => {
  return OrganizationAccountRole.create({ organization_account_id, role_id });
};

exports.removeRole = async (organization_account_id, role_id) => {
  return OrganizationAccountRole.destroy({ where: { organization_account_id, role_id } });
};
