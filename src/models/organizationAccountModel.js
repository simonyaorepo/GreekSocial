// organizationAccountModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrganizationAccount = sequelize.define('OrganizationAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'organization', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'organization_account',
  timestamps: true,
  underscored: true,
});

OrganizationAccount.associate = (models) => {
  OrganizationAccount.belongsTo(models.Organization, { foreignKey: 'organization_id', as: 'organization' });
  OrganizationAccount.belongsToMany(models.Role, {
    through: models.OrganizationAccountRole,
    foreignKey: 'organization_account_id',
    otherKey: 'role_id',
    as: 'roles',
  });
};

module.exports = OrganizationAccount;
