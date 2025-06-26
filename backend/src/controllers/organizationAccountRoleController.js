// organizationAccountRoleController.js
const { OrganizationAccountRole } = require('../models');

exports.assignRoleToOrganizationAccount = async (req, res) => {
  try {
    const { organization_account_id, role_id } = req.body;
    await OrganizationAccountRole.create({ organization_account_id, role_id });
    res.status(201).json({ message: 'Role assigned to organization account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeRoleFromOrganizationAccount = async (req, res) => {
  try {
    const { organization_account_id, role_id } = req.body;
    await OrganizationAccountRole.destroy({ where: { organization_account_id, role_id } });
    res.status(200).json({ message: 'Role removed from organization account.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
