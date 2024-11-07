const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./role');
const Permission = require('./permission');

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

RolePermission.belongsTo(Role, { foreignKey: 'role_id' });
RolePermission.belongsTo(Permission, { foreignKey: 'permission_id' });

module.exports = RolePermission;
