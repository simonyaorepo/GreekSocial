const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./roleModel');  // Import the Role model
const RolePermission = require('./rolePermissionModel');  // Import the RolePermission model

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  permission_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'permission',
  timestamps: false,
});

Permission.associate = (models) => {
  // Many-to-many relationship with Role through RolePermission
  Permission.belongsToMany(models.Role, {
    through: models.RolePermission,
    foreignKey: 'permission_id',
    otherKey: 'role_id',
    as: 'roles',
  });
};

module.exports = Permission;
