// notificationModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
}, {
  tableName: 'notification',
  timestamps: true,
  underscored: true,
  paranoid: true, // Enable soft deletes for audit and recovery
  // Best practice: Use environment variables for config, enable logging, and audit changes
});

Notification.associate = (models) => {
  Notification.belongsTo(models.Member, { foreignKey: 'user_id', as: 'user' });
  Notification.belongsTo(models.Chapter, { foreignKey: 'chapter_id', as: 'chapter' });
  Notification.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
};

// Best practice: Add hooks for audit logging (beforeUpdate, beforeDestroy, etc.)

module.exports = Notification;
