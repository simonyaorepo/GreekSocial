const permissionService = require('../services/permissionService');

exports.createPermission = async (req, res) => {
    try {
        const permission = await permissionService.createPermissionService(req.body);
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await permissionService.getAllPermissionsService();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPermissionById = async (req, res) => {
    try {
        const permission = await permissionService.getPermissionByIdService(req.params.id);
        if (!permission) return res.status(404).json({ message: "Permission not found" });
        res.status(200).json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePermission = async (req, res) => {
    try {
        const updatedPermission = await permissionService.updatePermissionService(req.params.id, req.body);
        res.status(200).json(updatedPermission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePermission = async (req, res) => {
    try {
        await permissionService.deletePermissionService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
