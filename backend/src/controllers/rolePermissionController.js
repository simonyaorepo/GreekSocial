// controllers/rolePermissionController.js
const rolePermissionService = require('../services/rolePermissionService');

exports.createRolePermission = async (req, res, next) => {
  try {
    const rolePermission = await rolePermissionService.createRolePermission(req.body);
    res.status(201).json(rolePermission);
  } catch (err) {
    next(err);
  }
};

exports.getAllRolePermissions = async (req, res, next) => {
  try {
    const rolePermissions = await rolePermissionService.getAllRolePermissions();
    res.json(rolePermissions);
  } catch (err) {
    next(err);
  }
};

exports.getRolePermissionById = async (req, res, next) => {
  try {
    const rolePermission = await rolePermissionService.getRolePermissionById(req.params.id);
    if (!rolePermission) return res.status(404).json({ message: 'Not found' });
    res.json(rolePermission);
  } catch (err) {
    next(err);
  }
};

exports.deleteRolePermission = async (req, res, next) => {
  try {
    await rolePermissionService.deleteRolePermission(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
