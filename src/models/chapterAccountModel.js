const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapter');

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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'chapter_accounts',
  timestamps: false, // Optional: Specify if you don't want timestamps (created_at, updated_at)
});

ChapterAccount.belongsTo(Chapter, { foreignKey: 'chapter_id' });

module.exports = ChapterAccount;
