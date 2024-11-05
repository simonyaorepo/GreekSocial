// services/rolePermissionService.js
const RolePermission = require('../models/RolePermission');

exports.createRolePermission = async (data) => {
    return await RolePermission.create(data);
};

exports.getAllRolePermissions = async () => {
    return await RolePermission.findAll();
};

exports.getRolePermissionById = async (id) => {
    return await RolePermission.findByPk(id);
};

exports.deleteRolePermission = async (id) => {
    const rolePermission = await RolePermission.findByPk(id);
    if (rolePermission) {
        await rolePermission.destroy();
        return true;
    }
    throw new Error('Role Permission not found');
};
