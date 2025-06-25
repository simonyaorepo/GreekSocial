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

// Assign a role to a member account
exports.assignRole = async (req, res) => {
  try {
    const { member_account_id, role_id } = req.body;
    await memberAccountService.assignRoleToAccount(member_account_id, role_id);
    res.status(201).json({ message: 'Role assigned to member account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a role from a member account
exports.removeRole = async (req, res) => {
  try {
    const { member_account_id, role_id } = req.body;
    await memberAccountService.removeRoleFromAccount(member_account_id, role_id);
    res.status(200).json({ message: 'Role removed from member account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles for a member account
exports.getRoles = async (req, res) => {
  try {
    const { member_account_id } = req.params;
    const roles = await memberAccountService.getRolesForAccount(member_account_id);
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all permissions for a member account (aggregated from roles)
exports.getPermissions = async (req, res) => {
  try {
    const { member_account_id } = req.params;
    const permissions = await memberAccountService.getPermissionsForAccount(member_account_id);
    res.status(200).json(permissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
