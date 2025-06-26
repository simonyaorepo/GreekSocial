const { OrganizationAccount, Role, Permission, OrganizationAccountRole } = require('../models');

exports.createOrganizationAccountService = async (data) => OrganizationAccount.create(data);
exports.getAllOrganizationAccountsService = async () => OrganizationAccount.findAll();
exports.getOrganizationAccountByIdService = async (id) => OrganizationAccount.findByPk(id);
exports.updateOrganizationAccountService = async (id, data) => {
  await OrganizationAccount.update(data, { where: { id } });
  return OrganizationAccount.findByPk(id);
};
exports.deleteOrganizationAccountService = async (id) => OrganizationAccount.destroy({ where: { id } });

exports.assignRoleToAccount = async (organization_account_id, role_id) => {
  const exists = await OrganizationAccountRole.findOne({ where: { organization_account_id, role_id } });
  if (exists) throw new Error('Role already assigned to this organization account.');
  return OrganizationAccountRole.create({ organization_account_id, role_id });
};

exports.removeRoleFromAccount = async (organization_account_id, role_id) => {
  return OrganizationAccountRole.destroy({ where: { organization_account_id, role_id } });
};

exports.getRolesForAccount = async (organization_account_id) => {
  const account = await OrganizationAccount.findByPk(organization_account_id, {
    include: [{ model: Role, as: 'roles' }],
  });
  if (!account) throw new Error('OrganizationAccount not found');
  return account.roles;
};

exports.getPermissionsForAccount = async (organization_account_id) => {
  const account = await OrganizationAccount.findByPk(organization_account_id, {
    include: [{
      model: Role,
      as: 'roles',
      include: [{ model: Permission, as: 'permissions' }],
    }],
  });
  if (!account) throw new Error('OrganizationAccount not found');
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