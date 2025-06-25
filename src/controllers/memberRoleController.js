// memberRoleController.js
const { MemberRole } = require('../models');

exports.assignRoleToMember = async (req, res) => {
  try {
    const { member_id, role_id } = req.body;
    await MemberRole.create({ member_id, role_id });
    res.status(201).json({ message: 'Role assigned to member.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeRoleFromMember = async (req, res) => {
  try {
    const { member_id, role_id } = req.body;
    await MemberRole.destroy({ where: { member_id, role_id } });
    res.status(200).json({ message: 'Role removed from member.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
