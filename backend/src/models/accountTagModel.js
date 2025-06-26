// accountTagModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AccountTag = sequelize.define('AccountTag', {
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'account', key: 'id' },
    onDelete: 'CASCADE',
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tag', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'account_tag',
  timestamps: false,
  underscored: true,
});

module.exports = AccountTag;
