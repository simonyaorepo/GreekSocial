const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Permission = require('./permissionModel');  // Import the Permission model
const RolePermission = require('./rolePermissionModel');  // Import the RolePermission model

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'role',
  timestamps: false,
});

Role.associate = (models) => {
  // Many-to-many relationship with Permission through RolePermission
  Role.belongsToMany(models.Permission, {
    through: models.RolePermission,
    foreignKey: 'role_id',
    otherKey: 'permission_id',
    as: 'permissions',
  });
};

module.exports = Role;
