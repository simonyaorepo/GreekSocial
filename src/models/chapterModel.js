const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Organization = require('./organizationModel');
const Post = require('./postModel');
const Event = require('./eventModel');
const Member = require('./memberModel');
const ChapterAccount = require('./chapterAccountModel');

const Chapter = sequelize.define('Chapter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Organization,
      key: 'id',
    },
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  founded_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'chapters',
  timestamps: false,
});

Chapter.associate = (models) => {
  Chapter.belongsTo(models.Organization, { foreignKey: 'organization_id' });
  Chapter.hasMany(models.Post, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Event, { foreignKey: 'chapter_id' });
  Chapter.hasMany(models.Member, { foreignKey: 'chapter_id' });
  Chapter.hasOne(models.ChapterAccount, { foreignKey: 'chapter_id' });
};

module.exports = Chapter;
