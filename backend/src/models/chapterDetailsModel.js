// chapterDetailsModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Account = require('./accountModel');

const ChapterDetails = sequelize.define('ChapterDetails', {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  organization_account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  founded_date: {
    type: DataTypes.DATE,
  },
  // Add other chapter-specific fields here
}, {
  tableName: 'chapter_details',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

ChapterDetails.belongsTo(Account, { foreignKey: 'account_id', as: 'account' });
Account.hasOne(ChapterDetails, { foreignKey: 'account_id' });

module.exports = ChapterDetails;
