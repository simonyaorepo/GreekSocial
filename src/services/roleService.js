// services/roleService.js
const {Role} = require('../models');

exports.createRole = async (data) => {
    return await Role.create(data);
};

exports.getAllRoles = async () => {
    return await Role.findAll();
};

exports.getRoleById = async (id) => {
    return await Role.findByPk(id);
};

exports.updateRole = async (id, data) => {
    const role = await Role.findByPk(id);
    if (role) {
        return await role.update(data);
    }
    throw new Error('Role not found');
};

exports.deleteRole = async (id) => {
    const role = await Role.findByPk(id);
    if (role) {
        await role.destroy();
        return true;
    }
    throw new Error('Role not found');
};
