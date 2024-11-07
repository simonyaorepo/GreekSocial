const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapter');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Chapter,
      key: 'id',
    },
    allowNull: false,
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  visibility: {
    type: DataTypes.STRING,
    defaultValue: 'public',
  },
  involved_chapters: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  tableName: 'events',
  timestamps: false,
});

Event.belongsTo(Chapter, { foreignKey: 'chapter_id' });

module.exports = Event;
