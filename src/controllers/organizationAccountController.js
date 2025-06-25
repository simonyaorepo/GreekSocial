const organizationAccountService = require('../services/organizationAccountService');

exports.createOrganizationAccount = async (req, res) => {
  try {
    const organizationAccount = await organizationAccountService.createOrganizationAccountService(req.body);
    res.status(201).json(organizationAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrganizationAccounts = async (req, res) => {
  try {
    const organizationAccounts = await organizationAccountService.getAllOrganizationAccountsService();
    res.status(200).json(organizationAccounts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrganizationAccountById = async (req, res) => {
  try {
    const organizationAccount = await organizationAccountService.getOrganizationAccountByIdService(req.params.id);
    if (!organizationAccount) return res.status(404).json({ message: "OrganizationAccount not found" });
    res.status(200).json(organizationAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrganizationAccount = async (req, res) => {
  try {
    const updatedOrganizationAccount = await organizationAccountService.updateOrganizationAccountService(req.params.id, req.body);
    res.status(200).json(updatedOrganizationAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrganizationAccount = async (req, res) => {
  try {
    await organizationAccountService.deleteOrganizationAccountService(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
