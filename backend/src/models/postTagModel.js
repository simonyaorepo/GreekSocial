// PostTag join table
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PostTag = sequelize.define('PostTag', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'post', key: 'id' },
    onDelete: 'CASCADE',
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tag', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'post_tag',
  timestamps: false,
  underscored: true,
});

module.exports = PostTag;
