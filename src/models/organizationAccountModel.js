const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Organization = require('./organizationModel');

const OrganizationAccount = sequelize.define('OrganizationAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Organization,  // References the 'id' column of the Organization model
      key: 'id',
    },
    allowNull: false,
  },
  account_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure the email is unique
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,  // Set to the current timestamp by default
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,  // Set to the current timestamp by default
  },
}, {
  tableName: 'organization_account',  // Specify custom table name
  timestamps: false,  // Disable default Sequelize timestamps
});

// Define associations with the Organization model
OrganizationAccount.associate = (models) => {
  OrganizationAccount.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
};

module.exports = OrganizationAccount;
