// memberAccountModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MemberAccount = sequelize.define('MemberAccount', {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  date_of_birth: { type: DataTypes.DATEONLY },
  // Add more member-specific fields as needed
}, {
  tableName: 'member_account',
  timestamps: false,
  underscored: true,
});

MemberAccount.associate = (models) => {
  MemberAccount.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
};

module.exports = MemberAccount;
