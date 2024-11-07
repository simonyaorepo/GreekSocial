const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapter');

const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  founded_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'organizations',
  timestamps: false,
});

Organization.hasMany(Chapter);

module.exports = Organization;
