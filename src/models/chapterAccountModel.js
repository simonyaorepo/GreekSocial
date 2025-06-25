// chapterAccountModel.js
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
    allowNull: false,
    references: { model: 'chapter', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  account_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'chapter_account',
  timestamps: true,
  underscored: true,
});

ChapterAccount.associate = (models) => {
  ChapterAccount.belongsTo(models.Chapter, { foreignKey: 'chapter_id', as: 'chapter' });
};

module.exports = ChapterAccount;
