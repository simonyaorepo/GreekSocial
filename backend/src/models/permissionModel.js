// permissionModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  permission_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'permission',
  timestamps: false, // Keep false as you had it
  underscored: true,
  paranoid: true, // Enable soft deletes for audit and recovery
  // Best practice: Use environment variables for config, enable logging, and audit changes
});

Permission.associate = (models) => {
  Permission.belongsToMany(models.Role, {
    through: models.RolePermission,
    foreignKey: 'permission_id',
    otherKey: 'role_id',
    as: 'roles',
  });
  Permission.belongsToMany(models.Account, {
    through: models.AccountPermission,
    foreignKey: 'permission_id',
    otherKey: 'account_id',
    as: 'accounts',
  });
};

// Best practice: Add hooks for audit logging (beforeUpdate, beforeDestroy, etc.)

module.exports = Permission;
