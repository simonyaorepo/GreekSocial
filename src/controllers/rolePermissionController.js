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

exports.updateRolePermission = async (req, res) => {
    try {
        const rolePermission = await RolePermission.update(req.body, { where: { id: req.params.id } });
        res.json(rolePermission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRolePermission = async (req, res) => {
    try {
        await RolePermission.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};