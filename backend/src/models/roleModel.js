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
  Role.belongsToMany(models.Account, {
    through: models.AccountRole,
    foreignKey: 'role_id',
    otherKey: 'account_id',
    as: 'accounts',
  });
};

module.exports = Role;
