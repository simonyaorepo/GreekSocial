// likeModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'post', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'member_account', key: 'account_id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'like',
  timestamps: true,
  underscored: true,
});

Like.associate = (models) => {
  Like.belongsTo(models.MemberAccount, { foreignKey: 'member_id', as: 'member' });
  Like.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
};

module.exports = Like;
