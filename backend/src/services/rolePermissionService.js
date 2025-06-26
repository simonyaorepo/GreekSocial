// services/rolePermissionService.js
const {RolePermission} = require('../models');

exports.createRolePermission = async (data) => {
    // Only allow whitelisted fields
    const allowedFields = ['role_id', 'permission_id'];
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await RolePermission.create(filtered);
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
        // If paranoid: true, this will soft delete
        await rolePermission.destroy();
        return true;
    }
    throw new Error('Role Permission not found');
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and audit logging for create/delete actions
