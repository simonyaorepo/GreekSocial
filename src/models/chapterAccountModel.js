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
      model: Chapter,  // References the 'id' column of the Chapter model
      key: 'id',
    },
    allowNull: false,
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
    unique: true,  // Ensure the email is unique
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,  // Set to the current timestamp by default
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,  // Set to the current timestamp by default
  },
}, {
  tableName: 'chapter_account',  // Specify custom table name
  timestamps: false,
  underscored: true  // Disable default Sequelize timestamps
});

// Define associations with the Chapter model
ChapterAccount.associate = (models) => {
  ChapterAccount.belongsTo(models.Chapter, { foreignKey: 'chapter_id', as: 'chapter' });
};

module.exports = ChapterAccount;
