// organizationAccountModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Organization = require('./organizationModel'); // Reference Organization

const OrganizationAccount = sequelize.define('OrganizationAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Organization,
      key: 'id',
    },
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Relationships
OrganizationAccount.belongsTo(Organization, { foreignKey: 'organization_id' });

module.exports = OrganizationAccount;
