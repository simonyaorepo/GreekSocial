const roleService = require('../services/roleService');

exports.createRole = async (req, res) => {
    try {
        const role = await roleService.createRoleService(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRolesService();
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await roleService.getRoleByIdService(req.params.id);
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.status(200).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const updatedRole = await roleService.updateRoleService(req.params.id, req.body);
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        await roleService.deleteRoleService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
