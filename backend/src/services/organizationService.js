// services/organizationService.js
const {Organization} = require('../models');

// Only accept whitelisted fields in service methods
exports.createOrganization = async (data) => {
    const allowedFields = ['name', 'founded_date', 'website'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Organization.create(filtered);
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
        const allowedFields = ['name', 'founded_date', 'website'];
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await organization.update(filtered);
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

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and error handling as needed
// Best practice: Add audit logging for create/update/delete actions
