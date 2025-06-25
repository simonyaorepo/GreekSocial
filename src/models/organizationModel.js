// organizationModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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
  },
  website: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'organization',
  timestamps: true,
  underscored: true,
  paranoid: true, // Enable soft deletes for audit and recovery
  // Best practice: Use environment variables for config, enable logging, and audit changes
});

Organization.associate = (models) => {
  Organization.hasMany(models.Chapter, { foreignKey: 'organization_id' });
  Organization.hasMany(models.Post, { foreignKey: 'organization_id' });
  Organization.hasMany(models.Event, { foreignKey: 'organization_id' });
  Organization.hasMany(models.Notification, { foreignKey: 'organization_id' });
  Organization.hasOne(models.OrganizationAccount, { foreignKey: 'organization_id' });

  // Tagging: Many-to-many with Tag
  if (models.Tag) {
    Organization.belongsToMany(models.Tag, {
      through: 'OrganizationTag',
      foreignKey: 'organization_id',
      otherKey: 'tag_id',
      as: 'tags',
    });
  }
};

// Best practice: Ensure sensitive fields (if any) are not exposed in responses
// Best practice: Add hooks for audit logging (beforeUpdate, beforeDestroy, etc.)

module.exports = Organization;
