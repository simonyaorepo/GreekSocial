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
  timestamps: false,
  underscored: true,
});

Tag.associate = (models) => {
  Tag.belongsToMany(models.Account, {
    through: models.AccountTag,
    foreignKey: 'tag_id',
    otherKey: 'account_id',
    as: 'accounts',
  });
  Tag.belongsToMany(models.ChapterAccount, { through: 'ChapterTag', foreignKey: 'tag_id', otherKey: 'chapter_account_id', as: 'chapters' });
  Tag.belongsToMany(models.MemberAccount, { through: 'MemberTag', foreignKey: 'tag_id', otherKey: 'member_account_id', as: 'members' });
  Tag.belongsToMany(models.OrganizationAccount, { through: 'OrganizationTag', foreignKey: 'tag_id', otherKey: 'organization_account_id', as: 'organizations' });
  Tag.belongsToMany(models.Post, { through: 'PostTag', foreignKey: 'tag_id', otherKey: 'post_id', as: 'posts' });
  Tag.belongsToMany(models.Comment, { through: 'CommentTag', foreignKey: 'tag_id', otherKey: 'comment_id', as: 'comments' });
};

module.exports = Tag;

// Best practice: Ensure sensitive fields (if any) are not exposed in responses
// Best practice: Use environment variables for config, not hardcoded values
// Best practice: Add hooks for audit logging if needed
