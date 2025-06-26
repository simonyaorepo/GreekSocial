// memberRoleModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MemberRole = sequelize.define('MemberRole', {
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member', key: 'id' },
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
  tableName: 'member_role',
  timestamps: false,
  underscored: true,
});

module.exports = MemberRole;
