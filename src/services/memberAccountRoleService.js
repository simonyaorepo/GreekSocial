// memberAccountRoleService.js
const { MemberAccountRole } = require('../models');

exports.assignRole = async (member_account_id, role_id) => {
  // Only allow whitelisted fields
  return MemberAccountRole.create({ member_account_id, role_id });
};

exports.removeRole = async (member_account_id, role_id) => {
  // If paranoid: true, this will soft delete
  return MemberAccountRole.destroy({ where: { member_account_id, role_id } });
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and audit logging for assign/remove actions
