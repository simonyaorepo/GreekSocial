// memberDetailsModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Account = require('./accountModel');

const MemberDetails = sequelize.define('MemberDetails', {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  chapter_account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  join_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  // Add other member-specific fields here
}, {
  tableName: 'member_details',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

MemberDetails.belongsTo(Account, { foreignKey: 'account_id', as: 'account' });
Account.hasOne(MemberDetails, { foreignKey: 'account_id' });

module.exports = MemberDetails;
