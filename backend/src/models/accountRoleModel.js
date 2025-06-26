// accountRoleModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AccountRole = sequelize.define('AccountRole', {
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'role', key: 'id' },
    onDelete: 'CASCADE',
  },
  scope_type: {
    type: DataTypes.ENUM('organization', 'chapter'),
    allowNull: false,
  },
  scope_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'account_role',
  timestamps: false,
  underscored: true,
});

module.exports = AccountRole;
