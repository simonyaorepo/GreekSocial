const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Member = require('./member');

const Friendship = sequelize.define('Friendship', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_1_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: 'id',
    },
    allowNull: false,
  },
  member_2_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'friendships',
  timestamps: false,
});

Friendship.belongsTo(Member, { foreignKey: 'member_1_id' });
Friendship.belongsTo(Member, { foreignKey: 'member_2_id' });

module.exports = Friendship;
