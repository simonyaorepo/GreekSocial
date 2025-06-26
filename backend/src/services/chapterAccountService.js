const { ChapterAccount, Role, Permission, ChapterAccountRole } = require('../models');

exports.createChapterAccountService = async (data) => ChapterAccount.create(data);
exports.getAllChapterAccountsService = async () => ChapterAccount.findAll();
exports.getChapterAccountByIdService = async (id) => ChapterAccount.findByPk(id);
exports.updateChapterAccountService = async (id, data) => {
  await ChapterAccount.update(data, { where: { id } });
  return ChapterAccount.findByPk(id);
};
exports.deleteChapterAccountService = async (id) => ChapterAccount.destroy({ where: { id } });

exports.assignRoleToAccount = async (chapter_account_id, role_id) => {
  const exists = await ChapterAccountRole.findOne({ where: { chapter_account_id, role_id } });
  if (exists) throw new Error('Role already assigned to this chapter account.');
  return ChapterAccountRole.create({ chapter_account_id, role_id });
};

exports.removeRoleFromAccount = async (chapter_account_id, role_id) => {
  return ChapterAccountRole.destroy({ where: { chapter_account_id, role_id } });
};

exports.getRolesForAccount = async (chapter_account_id) => {
  const account = await ChapterAccount.findByPk(chapter_account_id, {
    include: [{ model: Role, as: 'roles' }],
  });
  if (!account) throw new Error('ChapterAccount not found');
  return account.roles;
};

exports.getPermissionsForAccount = async (chapter_account_id) => {
  const account = await ChapterAccount.findByPk(chapter_account_id, {
    include: [{
      model: Role,
      as: 'roles',
      include: [{ model: Permission, as: 'permissions' }],
    }],
  });
  if (!account) throw new Error('ChapterAccount not found');
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
