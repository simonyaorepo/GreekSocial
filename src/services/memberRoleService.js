// memberRoleService.js
const { MemberRole } = require('../models');

exports.assignRole = async (member_id, role_id) => {
  return MemberRole.create({ member_id, role_id });
};

exports.removeRole = async (member_id, role_id) => {
  return MemberRole.destroy({ where: { member_id, role_id } });
};
