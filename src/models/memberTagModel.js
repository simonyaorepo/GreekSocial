// MemberTag join table
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MemberTag = sequelize.define('MemberTag', {
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member', key: 'id' },
    onDelete: 'CASCADE',
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tag', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'member_tag',
  timestamps: false,
  underscored: true,
});

module.exports = MemberTag;
