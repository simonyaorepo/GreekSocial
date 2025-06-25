const memberAccountService = require('../services/memberAccountService');

exports.createMemberAccount = async (req, res) => {
  try {
    const account = await memberAccountService.createMemberAccountService(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllMemberAccounts = async (req, res) => {
  try {
    const accounts = await memberAccountService.getAllMemberAccountsService();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMemberAccountById = async (req, res) => {
  try {
    const account = await memberAccountService.getMemberAccountByIdService(req.params.id);
    if (!account) return res.status(404).json({ message: 'MemberAccount not found' });
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMemberAccount = async (req, res) => {
  try {
    const account = await memberAccountService.updateMemberAccountService(req.params.id, req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMemberAccount = async (req, res) => {
  try {
    await memberAccountService.deleteMemberAccountService(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
