const chapterAccountService = require('../services/chapterAccountService');

exports.createChapterAccount = async (req, res) => {
  try {
    const account = await chapterAccountService.createChapterAccountService(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllChapterAccounts = async (req, res) => {
  try {
    const accounts = await chapterAccountService.getAllChapterAccountsService();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getChapterAccountById = async (req, res) => {
  try {
    const account = await chapterAccountService.getChapterAccountByIdService(req.params.id);
    if (!account) return res.status(404).json({ message: 'ChapterAccount not found' });
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateChapterAccount = async (req, res) => {
  try {
    const account = await chapterAccountService.updateChapterAccountService(req.params.id, req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteChapterAccount = async (req, res) => {
  try {
    await chapterAccountService.deleteChapterAccountService(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
