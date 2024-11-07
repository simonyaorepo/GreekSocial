const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapterModel');

const ChapterAccount = sequelize.define('ChapterAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Chapter,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'chapter_accounts',
  timestamps: false,
});

ChapterAccount.associate = (models) => {
  ChapterAccount.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
};

module.exports = ChapterAccount;
