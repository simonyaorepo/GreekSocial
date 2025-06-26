// services/permissionService.js
const {Permission} = require('../models');

exports.createPermission = async (data) => {
    // Only allow whitelisted fields
    const allowedFields = ['name', 'description']; // adjust as needed
    const filtered = {};
    allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
    return await Permission.create(filtered);
};

exports.getAllPermissions = async () => {
    return await Permission.findAll();
};

exports.getPermissionById = async (id) => {
    return await Permission.findByPk(id);
};

exports.updatePermission = async (id, data) => {
    const permission = await Permission.findByPk(id);
    if (permission) {
        // Only allow whitelisted fields
        const allowedFields = ['name', 'description']; // adjust as needed
        const filtered = {};
        allowedFields.forEach(f => { if (data[f] !== undefined) filtered[f] = data[f]; });
        return await permission.update(filtered);
    }
    throw new Error('Permission not found');
};

exports.deletePermission = async (id) => {
    const permission = await Permission.findByPk(id);
    if (permission) {
        // If paranoid: true, this will soft delete
        await permission.destroy();
        return true;
    }
    throw new Error('Permission not found');
};

// Best practice: Handle soft deletes if paranoid: true is enabled
// Best practice: Add logging and audit logging for create/update/delete actions
