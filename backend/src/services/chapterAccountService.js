const { ChapterAccount, Role, Permission, ChapterAccountRole } = require('../models');

exports.createChapterAccountService = async (data) => {
  return await ChapterAccount.create(data);
};

exports.getAllChapterAccountsService = async () => {
  return await ChapterAccount.findAll();
};

exports.getChapterAccountByIdService = async (id) => {
  return await ChapterAccount.findByPk(id);
};

exports.updateChapterAccountService = async (id, data) => {
  await ChapterAccount.update(data, { where: { id } });
  return await ChapterAccount.findByPk(id);
};

exports.deleteChapterAccountService = async (id) => {
  return await ChapterAccount.destroy({ where: { id } });
};

// Assign a role to a chapter account
exports.assignRoleToAccount = async (chapter_account_id, role_id) => {
  // Prevent duplicate assignment
  const exists = await ChapterAccountRole.findOne({ where: { chapter_account_id, role_id } });
  if (exists) throw new Error('Role already assigned to this chapter account.');
  return ChapterAccountRole.create({ chapter_account_id, role_id });
};

// Remove a role from a chapter account
exports.removeRoleFromAccount = async (chapter_account_id, role_id) => {
  return ChapterAccountRole.destroy({ where: { chapter_account_id, role_id } });
};

// Get all roles for a chapter account
exports.getRolesForAccount = async (chapter_account_id) => {
  const account = await ChapterAccount.findByPk(chapter_account_id, {
    include: [{ model: Role, as: 'roles' }],
  });
  if (!account) throw new Error('ChapterAccount not found');
  return account.roles;
};

// Get all permissions for a chapter account (aggregated from roles)
exports.getPermissionsForAccount = async (chapter_account_id) => {
  const account = await ChapterAccount.findByPk(chapter_account_id, {
    include: [{
      model: Role,
      as: 'roles',
      include: [{ model: Permission, as: 'permissions' }],
    }],
  });
  if (!account) throw new Error('ChapterAccount not found');
  // Aggregate unique permissions from all roles
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
