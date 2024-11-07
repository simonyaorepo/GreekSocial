// models/organization.js
module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      founded_date: {
        type: DataTypes.DATE,
      },
      website: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'organizations',
      timestamps: false,
    });
  
    Organization.associate = function(models) {
      Organization.hasMany(models.Chapter, { foreignKey: 'organization_id' });
      Organization.hasOne(models.Account, { foreignKey: 'account_id' });
    };
  
    return Organization;
  };
  