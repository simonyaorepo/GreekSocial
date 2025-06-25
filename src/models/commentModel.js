// commentModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'post', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'comment',
  timestamps: true,
  underscored: true,
  paranoid: true, // Enable soft deletes for audit and recovery
  // Best practice: Use environment variables for config, enable logging, and audit changes
});

Comment.associate = (models) => {
  Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
  Comment.belongsTo(models.Member, { foreignKey: 'member_id' });

  // Tagging: Many-to-many with Tag
  if (models.Tag) {
    Comment.belongsToMany(models.Tag, {
      through: 'CommentTag',
      foreignKey: 'comment_id',
      otherKey: 'tag_id',
      as: 'tags',
    });
  }
};

// Best practice: Ensure sensitive fields (if any) are not exposed in responses
// Best practice: Add hooks for audit logging (beforeUpdate, beforeDestroy, etc.)

module.exports = Comment;
