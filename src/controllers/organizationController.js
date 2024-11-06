const organizationService = require('../services/organizationService');

exports.createOrganization = async (req, res) => {
    try {
        const organization = await organizationService.createOrganizationService(req.body);
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
        const updatedOrganization = await organizationService.updateOrganizationService(req.params.id, req.body);
        res.status(200).json(updatedOrganization);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOrganization = async (req, res) => {
    try {
        await organizationService.deleteOrganizationService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
