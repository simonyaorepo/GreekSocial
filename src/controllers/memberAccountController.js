const memberAccountService = require('../services/memberAccountService');

exports.createMemberAccount = async (req, res) => {
  try {
    const memberAccount = await memberAccountService.createMemberAccountService(req.body);
    res.status(201).json(memberAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllMemberAccounts = async (req, res) => {
  try {
    const memberAccounts = await memberAccountService.getAllMemberAccountsService();
    res.status(200).json(memberAccounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMemberAccountById = async (req, res) => {
  try {
    const memberAccount = await memberAccountService.getMemberAccountByIdService(req.params.id);
    if (!memberAccount) return res.status(404).json({ message: "MemberAccount not found" });
    res.status(200).json(memberAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMemberAccount = async (req, res) => {
  try {
    const updatedMemberAccount = await memberAccountService.updateMemberAccountService(req.params.id, req.body);
    res.status(200).json(updatedMemberAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMemberAccount = async (req, res) => {
  try {
    await memberAccountService.deleteMemberAccountService(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
