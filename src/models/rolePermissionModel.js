// rolePermissionModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RolePermission = sequelize.define('RolePermission', {
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'role', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primaryKey: true,
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'permission', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primaryKey: true,
  },
}, {
  tableName: 'role_permission',
  timestamps: false,
  underscored: true,
});

RolePermission.associate = (models) => {
  RolePermission.belongsTo(models.Role, { foreignKey: 'role_id' });
  RolePermission.belongsTo(models.Permission, { foreignKey: 'permission_id' });
};

module.exports = RolePermission;
