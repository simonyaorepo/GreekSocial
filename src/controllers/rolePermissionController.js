const RolePermission = require('../models/rolePermissionModel');

exports.createRolePermission = async (req, res) => {
    try {
        const rolePermission = await RolePermission.create(req.body);
        res.status(201).json(rolePermission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await RolePermission.findAll();
        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
