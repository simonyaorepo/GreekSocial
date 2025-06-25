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
});

Organization.associate = (models) => {
  Organization.hasMany(models.Post, { foreignKey: 'organization_id' });
  Organization.hasMany(models.Event, { foreignKey: 'organization_id' });
  Organization.hasMany(models.Notification, { foreignKey: 'organization_id' });

  Organization.belongsToMany(models.Role, {
    through: models.RolePermission,
    foreignKey: 'organization_id',
    as: 'roles',
  });

  Organization.hasOne(models.OrganizationAccount, { foreignKey: 'organization_id' });
};

module.exports = Organization;
