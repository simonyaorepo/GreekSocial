// models/chapter.js
module.exports = (sequelize, DataTypes) => {
    const Chapter = sequelize.define('Chapter', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
      },
      founded_date: {
        type: DataTypes.DATE,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'chapters',
      timestamps: false,
    });
  
    Chapter.associate = function(models) {
      Chapter.belongsTo(models.Organization, { foreignKey: 'organization_id' });
      Chapter.hasOne(models.Account, { foreignKey: 'account_id' });
    };
  
    return Chapter;
  };
  