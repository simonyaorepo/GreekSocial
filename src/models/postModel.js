// postModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'chapter', key: 'id' },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'organization', key: 'id' },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  visibility: {
    type: DataTypes.STRING,
    defaultValue: 'public',
  },
}, {
  tableName: 'post',
  timestamps: true,
  underscored: true,
});

Post.associate = (models) => {
  Post.belongsTo(models.Member, { foreignKey: 'member_id' });
  Post.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
  Post.belongsTo(models.Organization, { foreignKey: 'organization_id' });
  Post.hasMany(models.Comment, { foreignKey: 'post_id' });
  Post.hasMany(models.Like, { foreignKey: 'post_id' });
};

module.exports = Post;
