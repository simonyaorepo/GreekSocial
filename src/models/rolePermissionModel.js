const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./roleModel');  // Import the Role model
const Permission = require('./permissionModel');  // Import the Permission model

const RolePermission = sequelize.define('RolePermission', {
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id',
    },
    allowNull: false,
  },
  permission_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'role_permission',
  timestamps: false,
});

// Optional: You could define the associations in RolePermission if you want
RolePermission.associate = (models) => {
  // Each RolePermission belongs to one Role
  RolePermission.belongsTo(models.Role, { foreignKey: 'role_id' });

  // Each RolePermission belongs to one Permission
  RolePermission.belongsTo(models.Permission, { foreignKey: 'permission_id' });
};

module.exports = RolePermission;
