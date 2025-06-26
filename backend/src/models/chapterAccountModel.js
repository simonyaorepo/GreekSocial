// chapterAccountModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ChapterAccount = sequelize.define('ChapterAccount', {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  chapter_name: { type: DataTypes.STRING, allowNull: false },
  founded_date: { type: DataTypes.DATEONLY },
  // Add more chapter-specific fields as needed
}, {
  tableName: 'chapter_account',
  timestamps: false,
  underscored: true,
});

ChapterAccount.associate = (models) => {
  ChapterAccount.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
};

module.exports = ChapterAccount;
