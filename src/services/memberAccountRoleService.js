// memberAccountRoleService.js
const { MemberAccountRole } = require('../models');

exports.assignRole = async (member_account_id, role_id) => {
  return MemberAccountRole.create({ member_account_id, role_id });
};

exports.removeRole = async (member_account_id, role_id) => {
  return MemberAccountRole.destroy({ where: { member_account_id, role_id } });
};
