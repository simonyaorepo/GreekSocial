// services/permissionService.js
const {Permission} = require('../models');

exports.createPermission = async (data) => {
    return await Permission.create(data);
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
        return await permission.update(data);
    }
    throw new Error('Permission not found');
};

exports.deletePermission = async (id) => {
    const permission = await Permission.findByPk(id);
    if (permission) {
        await permission.destroy();
        return true;
    }
    throw new Error('Permission not found');
};
