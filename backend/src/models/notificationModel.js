// notificationModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
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
}, {
  tableName: 'notification',
  timestamps: true,
  underscored: true,
  paranoid: true, // Enable soft deletes for audit and recovery
  // Best practice: Use environment variables for config, enable logging, and audit changes
});

Notification.associate = (models) => {
  Notification.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
};

// Best practice: Add hooks for audit logging (beforeUpdate, beforeDestroy, etc.)

module.exports = Notification;
