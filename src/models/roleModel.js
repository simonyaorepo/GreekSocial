// roleModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'role',
  timestamps: false,
  underscored: true,
});

Role.associate = (models) => {
  Role.belongsToMany(models.Permission, {
    through: models.RolePermission,
    foreignKey: 'role_id',
    otherKey: 'permission_id',
    as: 'permissions',
  });
  Role.belongsToMany(models.ChapterAccount, {
    through: models.ChapterAccountRole,
    foreignKey: 'role_id',
    otherKey: 'chapter_account_id',
    as: 'chapterAccounts',
  });
  Role.belongsToMany(models.OrganizationAccount, {
    through: models.OrganizationAccountRole,
    foreignKey: 'role_id',
    otherKey: 'organization_account_id',
    as: 'organizationAccounts',
  });
};

module.exports = Role;
