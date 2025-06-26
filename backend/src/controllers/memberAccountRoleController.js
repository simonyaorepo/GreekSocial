// memberAccountRoleController.js
const { MemberAccountRole } = require('../models');

exports.assignRoleToMemberAccount = async (req, res) => {
  try {
    const { member_account_id, role_id } = req.body;
    await MemberAccountRole.create({ member_account_id, role_id });
    res.status(201).json({ message: 'Role assigned to member account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeRoleFromMemberAccount = async (req, res) => {
  try {
    const { member_account_id, role_id } = req.body;
    await MemberAccountRole.destroy({ where: { member_account_id, role_id } });
    res.status(200).json({ message: 'Role removed from member account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
