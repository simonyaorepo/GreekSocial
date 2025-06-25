const { ChapterAccount } = require('../models');

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
