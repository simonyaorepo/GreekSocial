const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Member = require('./member');
const Chapter = require('./chapter');
const Organization = require('./organization');
const Comment = require('./comment');
const Like = require('./like');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: 'id',
    },
    allowNull: false,
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Chapter,
      key: 'id',
    },
    allowNull: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Organization,
      key: 'id',
    },
    allowNull: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  visibility: {
    type: DataTypes.STRING,
    defaultValue: 'public',
  },
}, {
  tableName: 'posts',
  timestamps: false,
});

Post.belongsTo(Member, { foreignKey: 'member_id' });
Post.belongsTo(Chapter, { foreignKey: 'chapter_id' });
Post.belongsTo(Organization, { foreignKey: 'organization_id' });
Post.hasMany(Comment);
Post.hasMany(Like);

module.exports = Post;
