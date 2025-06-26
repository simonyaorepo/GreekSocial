// postModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
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
  paranoid: true, // Enable soft deletes for audit and recovery
  // Best practice: Use environment variables for config, enable logging, and audit changes
});

Post.associate = (models) => {
  Post.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
  Post.hasMany(models.Comment, { foreignKey: 'post_id' });
  Post.hasMany(models.Like, { foreignKey: 'post_id' });

  // Tagging: Many-to-many with Tag
  if (models.Tag) {
    Post.belongsToMany(models.Tag, {
      through: 'PostTag',
      foreignKey: 'post_id',
      otherKey: 'tag_id',
      as: 'tags',
    });
  }
};

// Best practice: Ensure sensitive fields (if any) are not exposed in responses
// Best practice: Add hooks for audit logging (beforeUpdate, beforeDestroy, etc.)

module.exports = Post;
