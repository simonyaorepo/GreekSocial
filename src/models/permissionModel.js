const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  permission_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'permissions',
  timestamps: false,
});

module.exports = Permission;
