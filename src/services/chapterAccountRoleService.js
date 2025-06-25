// chapterAccountRoleService.js
const { ChapterAccountRole } = require('../models');

exports.assignRole = async (chapter_account_id, role_id) => {
  return ChapterAccountRole.create({ chapter_account_id, role_id });
};

exports.removeRole = async (chapter_account_id, role_id) => {
  return ChapterAccountRole.destroy({ where: { chapter_account_id, role_id } });
};
