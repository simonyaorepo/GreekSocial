// accountModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.ENUM('organization', 'chapter', 'member'),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Add other common fields here (e.g., password, status, etc.)
}, {
  tableName: 'account',
  timestamps: true,
  underscored: true,
  paranoid: true, // Enable soft deletes
});

// Unified Account <-> Tag association
// Detail associations
Account.associate = (models) => {
  Account.belongsToMany(models.Tag, {
    through: models.AccountTag,
    foreignKey: 'account_id',
    otherKey: 'tag_id',
    as: 'tags',
  });
  Account.hasOne(models.MemberDetails, { foreignKey: 'account_id', as: 'memberDetails' });
  Account.hasOne(models.ChapterDetails, { foreignKey: 'account_id', as: 'chapterDetails' });
  Account.hasOne(models.OrganizationDetails, { foreignKey: 'account_id', as: 'organizationDetails' });
  // Example: Account <-> Role association (if you want roles per account)
  Account.belongsToMany(models.Role, {
    through: models.AccountRole, // You may need to create this join table
    foreignKey: 'account_id',
    otherKey: 'role_id',
    as: 'roles',
  });
  // Add detail associations if needed
};

module.exports = Account;
