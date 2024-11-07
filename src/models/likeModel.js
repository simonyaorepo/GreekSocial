const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Post = require('./post');
const Member = require('./member');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Member,
      key: 'id',
    },
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'likes',
  timestamps: false,
});

Like.belongsTo(Post, { foreignKey: 'post_id' });
Like.belongsTo(Member, { foreignKey: 'user_id' });

module.exports = Like;
