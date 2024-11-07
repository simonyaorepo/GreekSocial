const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Member = require('./memberModel');
const Chapter = require('./chapterModel');
const Organization = require('./organizationModel');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,  // Link notification to a member
      key: 'id',
    },
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,  // Set to current timestamp
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,  // Set to current timestamp
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Chapter,  // Link notification to a chapter (optional)
      key: 'id',
    },
    allowNull: true,  // A notification can belong to a chapter
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Organization,  // Link notification to an organization (optional)
      key: 'id',
    },
    allowNull: true,  // A notification can belong to an organization
  },
}, {
  tableName: 'notifications',
  timestamps: false,
});

// Associations
Notification.associate = (models) => {
  Notification.belongsTo(models.Member, { foreignKey: 'user_id', as: 'user' });
  Notification.belongsTo(models.Chapter, { foreignKey: 'chapter_id', as: 'chapter' });
  Notification.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
};

module.exports = Notification;
