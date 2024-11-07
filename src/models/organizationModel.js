const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapterModel');
const Notification = require('./notificationModel');

const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  founded_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'organization',
  timestamps: false,
});

Organization.associate = (models) => {
  Organization.hasMany(models.Chapter, { foreignKey: 'organization_id' });
  Organization.hasMany(Notification, { foreignKey: 'organization_id', as: 'notifications' });
};

module.exports = Organization;
