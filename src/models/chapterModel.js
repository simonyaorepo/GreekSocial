const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Organization = require('./organization');
const Post = require('./post');
const Event = require('./event');
const Member = require('./member');
const ChapterAccount = require('./chapteraccount');

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
  timestamps: false, // Optional: Specify if you don't want timestamps (created_at, updated_at)
});

Chapter.belongsTo(Organization, { foreignKey: 'organization_id' });
Chapter.hasMany(Post);
Chapter.hasMany(Event);
Chapter.hasMany(Member);
Chapter.hasOne(ChapterAccount);

module.exports = Chapter;
