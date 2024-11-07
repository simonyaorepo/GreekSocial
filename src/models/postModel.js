const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapterModel');
const Member = require('./memberModel');
const Organization = require('./organizationModel');
const Comment = require('./commentModel');
const Like = require('./likeModel');

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

Post.associate = (models) => {
  Post.belongsTo(models.Member, { foreignKey: 'member_id' });
  Post.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
  Post.belongsTo(models.Organization, { foreignKey: 'organization_id' });
  Post.hasMany(models.Comment, { foreignKey: 'post_id' });
  Post.hasMany(models.Like, { foreignKey: 'post_id' });
};

module.exports = Post;
