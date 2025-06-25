const organizationService = require('../services/organizationService');
const organizationAccountService = require('../services/organizationAccountService');

exports.createOrganization = async (req, res) => {
  try {
    // Create organization first
    const organization = await organizationService.createOrganizationService(req.body);

    // Automatically create associated OrganizationAccount with organization_id
    const accountData = { organization_id: organization.id, ...req.body.account };
    await organizationAccountService.createOrganizationAccountService(accountData);

    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await organizationService.getAllOrganizationsService();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await organizationService.getOrganizationByIdService(req.params.id);
    if (!organization) return res.status(404).json({ message: "Organization not found" });
    res.status(200).json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    // Update organization data
    const updatedOrganization = await organizationService.updateOrganizationService(req.params.id, req.body);

    // Update associated OrganizationAccount if account data provided
    if (req.body.account) {
      await organizationAccountService.updateOrganizationAccountServiceByOrganizationId(req.params.id, req.body.account);
    }

    res.status(200).json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    // Delete organization account first
    await organizationAccountService.deleteOrganizationAccountServiceByOrganizationId(req.params.id);

    // Delete organization
    await organizationService.deleteOrganizationService(req.params.id);

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
