// models/account.js
module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'member', // 'member', 'chapter', 'organization'
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'accounts',
      timestamps: false,
    });
  
    Account.associate = function(models) {
      // One-to-one relationship with members, chapters, and organizations
      Account.hasOne(models.Member, { foreignKey: 'account_id' });
      Account.hasOne(models.Chapter, { foreignKey: 'account_id' });
      Account.hasOne(models.Organization, { foreignKey: 'account_id' });
    };
  
    return Account;
  };
  