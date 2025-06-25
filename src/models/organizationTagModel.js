// OrganizationTag join table
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrganizationTag = sequelize.define('OrganizationTag', {
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'organization', key: 'id' },
    onDelete: 'CASCADE',
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tag', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'organization_tag',
  timestamps: false,
  underscored: true,
});

module.exports = OrganizationTag;
