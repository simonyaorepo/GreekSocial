// friendshipModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Friendship = sequelize.define('Friendship', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  friend_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  tableName: 'friendship',
  timestamps: true,
  underscored: true,
});

Friendship.associate = (models) => {
  Friendship.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member' });
  Friendship.belongsTo(models.Member, { foreignKey: 'friend_id', as: 'friend' });
};

module.exports = Friendship;
