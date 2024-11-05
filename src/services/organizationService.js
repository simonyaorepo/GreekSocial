// services/organizationService.js
const Organization = require('../models/Organization');

exports.createOrganization = async (data) => {
    return await Organization.create(data);
};

exports.getAllOrganizations = async () => {
    return await Organization.findAll();
};

exports.getOrganizationById = async (id) => {
    return await Organization.findByPk(id);
};

exports.updateOrganization = async (id, data) => {
    const organization = await Organization.findByPk(id);
    if (organization) {
        return await organization.update(data);
    }
    throw new Error('Organization not found');
};

exports.deleteOrganization = async (id) => {
    const organization = await Organization.findByPk(id);
    if (organization) {
        await organization.destroy();
        return true;
    }
    throw new Error('Organization not found');
};
