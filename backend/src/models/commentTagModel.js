// CommentTag join table
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CommentTag = sequelize.define('CommentTag', {
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'comment', key: 'id' },
    onDelete: 'CASCADE',
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tag', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'comment_tag',
  timestamps: false,
  underscored: true,
});

module.exports = CommentTag;
