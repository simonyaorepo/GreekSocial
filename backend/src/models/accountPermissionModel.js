// accountPermissionModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AccountPermission = sequelize.define('AccountPermission', {
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'permission', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'account_permission',
  timestamps: false,
  underscored: true,
});

module.exports = AccountPermission;
