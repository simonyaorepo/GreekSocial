const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./roleModel');
const RolePermission = require('./rolePermissionModel');
const Post = require('./postModel');
const Event = require('./eventModel');
const Notification = require('./notificationModel');
const OrganizationAccount = require('./organizationAccountModel'); // Linking to OrganizationAccount

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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'organization',
  timestamps: false,
});

// Associations
Organization.associate = (models) => {
  Organization.hasMany(models.Post, { foreignKey: 'organization_id' });
  Organization.hasMany(models.Event, { foreignKey: 'organization_id' });
  Organization.hasMany(models.Notification, { foreignKey: 'user_id' });

  // Many-to-many relationship with roles
  Organization.belongsToMany(models.Role, {
    through: models.RolePermission,
    foreignKey: 'organization_id',
    as: 'roles',
  });

  // Linking to OrganizationAccount (one-to-one)
  Organization.hasOne(models.OrganizationAccount, { foreignKey: 'organization_id' });
};

module.exports = Organization;
