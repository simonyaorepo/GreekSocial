// chapterAccountRoleModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ChapterAccountRole = sequelize.define('ChapterAccountRole', {
  chapter_account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'chapter_account', key: 'id' },
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
  tableName: 'chapter_account_role',
  timestamps: false,
  underscored: true,
});

module.exports = ChapterAccountRole;
