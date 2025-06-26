const rolePermissionService = require('../services/rolePermissionService');

exports.createRolePermission = async (req, res, next) => {
  try {
    const rolePermission = await rolePermissionService.createRolePermissionService(req.body);
    res.status(201).json(rolePermission);
  } catch (error) {
    next(error);
  }
};

exports.getAllRolePermissions = async (req, res, next) => {
  try {
    const rolePermissions = await rolePermissionService.getAllRolePermissionsService();
    res.status(200).json(rolePermissions);
  } catch (error) {
    next(error);
  }
};

exports.getRolePermissionById = async (req, res, next) => {
  try {
    const rolePermission = await rolePermissionService.getRolePermissionByIdService(req.params.id);
    if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
    res.status(200).json(rolePermission);
  } catch (error) {
    next(error);
  }
};

exports.deleteRolePermission = async (req, res, next) => {
  try {
    await rolePermissionService.deleteRolePermissionService(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
