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

module.exports = Organization;
