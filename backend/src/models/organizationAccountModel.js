// organizationAccountModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrganizationAccount = sequelize.define('OrganizationAccount', {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  organization_name: { type: DataTypes.STRING, allowNull: false },
  registration_number: { type: DataTypes.STRING },
  // Add more organization-specific fields as needed
}, {
  tableName: 'organization_account',
  timestamps: false,
  underscored: true,
});

OrganizationAccount.associate = (models) => {
  OrganizationAccount.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
};

module.exports = OrganizationAccount;
