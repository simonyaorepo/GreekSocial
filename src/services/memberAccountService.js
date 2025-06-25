const { MemberAccount, Role, Permission, MemberAccountRole } = require('../models');

exports.createMemberAccountService = async (data) => MemberAccount.create(data);
exports.getAllMemberAccountsService = async () => MemberAccount.findAll();
exports.getMemberAccountByIdService = async (id) => MemberAccount.findByPk(id);
exports.updateMemberAccountService = async (id, data) => {
  await MemberAccount.update(data, { where: { id } });
  return MemberAccount.findByPk(id);
};
exports.deleteMemberAccountService = async (id) => MemberAccount.destroy({ where: { id } });

exports.assignRoleToAccount = async (member_account_id, role_id) => {
  const exists = await MemberAccountRole.findOne({ where: { member_account_id, role_id } });
  if (exists) throw new Error('Role already assigned to this member account.');
  return MemberAccountRole.create({ member_account_id, role_id });
};

exports.removeRoleFromAccount = async (member_account_id, role_id) => {
  return MemberAccountRole.destroy({ where: { member_account_id, role_id } });
};

exports.getRolesForAccount = async (member_account_id) => {
  const account = await MemberAccount.findByPk(member_account_id, {
    include: [{ model: Role, as: 'roles' }],
  });
  if (!account) throw new Error('MemberAccount not found');
  return account.roles;
};

exports.getPermissionsForAccount = async (member_account_id) => {
  const account = await MemberAccount.findByPk(member_account_id, {
    include: [{
      model: Role,
      as: 'roles',
      include: [{ model: Permission, as: 'permissions' }],
    }],
  });
  if (!account) throw new Error('MemberAccount not found');
  const permissions = [];
  account.roles.forEach(role => {
    if (role.permissions) {
      role.permissions.forEach(perm => {
        if (!permissions.find(p => p.id === perm.id)) {
          permissions.push(perm);
        }
      });
    }
  });
  return permissions;
};



