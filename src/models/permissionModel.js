module.exports = (sequelize) => {
    class Permission extends Model {}
    Permission.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { sequelize, modelName: 'permission' });

    return Permission;
};
