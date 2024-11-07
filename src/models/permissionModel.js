// models/permission.js
module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      permission_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'permissions',
      timestamps: false,
    });
  
    return Permission;
  };
  