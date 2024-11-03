const Organization = require('../models/organizationModel');

exports.createOrganization = async (req, res) => {
    try {
        const organization = await Organization.create(req.body);
        res.status(201).json(organization);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.findAll();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
