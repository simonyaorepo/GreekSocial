// organizationDetailsModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Account = require('./accountModel');

const OrganizationDetails = sequelize.define('OrganizationDetails', {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
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
  // Add other org-specific fields here
}, {
  tableName: 'organization_details',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

OrganizationDetails.belongsTo(Account, { foreignKey: 'account_id', as: 'account' });
Account.hasOne(OrganizationDetails, { foreignKey: 'account_id' });

module.exports = OrganizationDetails;
