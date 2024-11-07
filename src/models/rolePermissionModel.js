const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./roleModel');
const Permission = require('./permissionModel');

const RolePermission = sequelize.define('RolePermission', {
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id',
    },
    allowNull: false,
  },
  permission_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'role_permissions',
  timestamps: false,
});

module.exports = RolePermission;
