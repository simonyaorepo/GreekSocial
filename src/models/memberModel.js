// models/member.js
module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      join_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'members',
      timestamps: false,
    });
  
    Member.associate = function(models) {
      Member.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
      Member.hasOne(models.Account, { foreignKey: 'account_id' });
    };
  
    return Member;
  };
  