const chapterAccountService = require('../services/chapterAccountService');

exports.createChapterAccount = async (req, res) => {
  try {
    const account = await chapterAccountService.createChapterAccountService(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllChapterAccounts = async (req, res) => {
  try {
    const accounts = await chapterAccountService.getAllChapterAccountsService();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getChapterAccountById = async (req, res) => {
  try {
    const account = await chapterAccountService.getChapterAccountByIdService(req.params.id);
    if (!account) return res.status(404).json({ message: "ChapterAccount not found" });
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateChapterAccount = async (req, res) => {
  try {
    const updatedAccount = await chapterAccountService.updateChapterAccountService(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteChapterAccount = async (req, res) => {
  try {
    await chapterAccountService.deleteChapterAccountService(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Assign a role to a chapter account
exports.assignRole = async (req, res) => {
  try {
    const { chapter_account_id, role_id } = req.body;
    // TODO: Call service to assign role
    await chapterAccountService.assignRoleToAccount(chapter_account_id, role_id);
    res.status(201).json({ message: 'Role assigned to chapter account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a role from a chapter account
exports.removeRole = async (req, res) => {
  try {
    const { chapter_account_id, role_id } = req.body;
    // TODO: Call service to remove role
    await chapterAccountService.removeRoleFromAccount(chapter_account_id, role_id);
    res.status(200).json({ message: 'Role removed from chapter account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles for a chapter account
exports.getRoles = async (req, res) => {
  try {
    const { chapter_account_id } = req.params;
    // TODO: Call service to get roles
    const roles = await chapterAccountService.getRolesForAccount(chapter_account_id);
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all permissions for a chapter account (aggregated from roles)
exports.getPermissions = async (req, res) => {
  try {
    const { chapter_account_id } = req.params;
    // TODO: Call service to get permissions
    const permissions = await chapterAccountService.getPermissionsForAccount(chapter_account_id);
    res.status(200).json(permissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
