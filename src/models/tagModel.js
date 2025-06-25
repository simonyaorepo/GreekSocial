// tagModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'tag',
  timestamps: true,
  underscored: true,
});

Tag.associate = (models) => {
  // Many-to-many with all taggable entities
  Tag.belongsToMany(models.Chapter, { through: 'ChapterTag', foreignKey: 'tag_id', otherKey: 'chapter_id', as: 'chapters' });
  Tag.belongsToMany(models.Member, { through: 'MemberTag', foreignKey: 'tag_id', otherKey: 'member_id', as: 'members' });
  Tag.belongsToMany(models.Organization, { through: 'OrganizationTag', foreignKey: 'tag_id', otherKey: 'organization_id', as: 'organizations' });
  Tag.belongsToMany(models.Post, { through: 'PostTag', foreignKey: 'tag_id', otherKey: 'post_id', as: 'posts' });
  Tag.belongsToMany(models.Comment, { through: 'CommentTag', foreignKey: 'tag_id', otherKey: 'comment_id', as: 'comments' });
};

module.exports = Tag;
