// EventTag join table
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const EventTag = sequelize.define('EventTag', {
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'event', key: 'id' },
    onDelete: 'CASCADE',
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tag', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'event_tag',
  timestamps: false,
  underscored: true,
});

module.exports = EventTag;
