// eventModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'chapter', key: 'id' },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'organization', key: 'id' },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  visibility: {
    type: DataTypes.STRING,
    defaultValue: 'public',
  },
}, {
  tableName: 'event',
  timestamps: true,
  underscored: true,
  paranoid: true, // Enable soft deletes for audit and recovery
});

Event.associate = (models) => {
  Event.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
  Event.belongsTo(models.Organization, { foreignKey: 'organization_id' });
};

module.exports = Event;

// Best practice: Ensure sensitive fields (if any) are not exposed in responses
// Best practice: Use environment variables for config, not hardcoded values
// Best practice: Add hooks for audit logging if needed
