// organizationAccountRoleModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrganizationAccountRole = sequelize.define('OrganizationAccountRole', {
  organization_account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'organization_account', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'role', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primaryKey: true,
  },
}, {
  tableName: 'organization_account_role',
  timestamps: false,
  underscored: true,
});

module.exports = OrganizationAccountRole;
