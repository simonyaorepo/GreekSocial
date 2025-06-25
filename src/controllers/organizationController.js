const organizationService = require('../services/organizationService');

exports.createOrganization = async (req, res, next) => {
  try {
    const organization = await organizationService.createOrganizationService(req.body);
    res.status(201).json(organization);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrganizations = async (req, res, next) => {
  try {
    const organizations = await organizationService.getAllOrganizationsService();
    res.status(200).json(organizations);
  } catch (error) {
    next(error);
  }
};

exports.getOrganizationById = async (req, res, next) => {
  try {
    const organization = await organizationService.getOrganizationByIdService(req.params.id);
    if (!organization) return res.status(404).json({ message: "Organization not found" });
    res.status(200).json(organization);
  } catch (error) {
    next(error);
  }
};

exports.updateOrganization = async (req, res, next) => {
  try {
    const updatedOrganization = await organizationService.updateOrganizationService(req.params.id, req.body);
    res.status(200).json(updatedOrganization);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrganization = async (req, res, next) => {
  try {
    await organizationService.deleteOrganizationService(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
