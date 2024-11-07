// models/role_permission.js
module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'role_permissions',
    timestamps: false,
  });

  RolePermission.associate = function(models) {
    RolePermission.belongsTo(models.Role, { foreignKey: 'role_id' });
    RolePermission.belongsTo(models.Permission, { foreignKey: 'permission_id' });
  };

  return RolePermission;
};
