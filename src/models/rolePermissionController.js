module.exports = (sequelize) => {
    class RolePermission extends Model {}
    RolePermission.init({
        roleId: {
            type: DataTypes.INTEGER,
            references: { model: 'roles', key: 'id' }
        },
        permission: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { sequelize, modelName: 'role_permission' });

    return RolePermission;
};
