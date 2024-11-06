const rolePermissionService = require('../services/rolePermissionService');

exports.createRolePermission = async (req, res) => {
    try {
        const rolePermission = await rolePermissionService.createRolePermissionService(req.body);
        res.status(201).json(rolePermission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await rolePermissionService.getAllRolePermissionsService();
        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRolePermissionById = async (req, res) => {
    try {
        const rolePermission = await rolePermissionService.getRolePermissionByIdService(req.params.id);
        if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
        res.status(200).json(rolePermission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRolePermission = async (req, res) => {
    try {
        await rolePermissionService.deleteRolePermissionService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
