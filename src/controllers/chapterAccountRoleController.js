// chapterAccountRoleController.js
const { ChapterAccountRole } = require('../models');

exports.assignRoleToChapterAccount = async (req, res) => {
  try {
    const { chapter_account_id, role_id } = req.body;
    await ChapterAccountRole.create({ chapter_account_id, role_id });
    res.status(201).json({ message: 'Role assigned to chapter account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeRoleFromChapterAccount = async (req, res) => {
  try {
    const { chapter_account_id, role_id } = req.body;
    await ChapterAccountRole.destroy({ where: { chapter_account_id, role_id } });
    res.status(200).json({ message: 'Role removed from chapter account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
