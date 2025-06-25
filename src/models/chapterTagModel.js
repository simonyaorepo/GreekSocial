// ChapterTag join table
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ChapterTag = sequelize.define('ChapterTag', {
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'chapter', key: 'id' },
    onDelete: 'CASCADE',
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tag', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'chapter_tag',
  timestamps: false,
  underscored: true,
});

module.exports = ChapterTag;
