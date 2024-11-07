const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Post = require('./postModel');
const Member = require('./memberModel');

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
  member_id: {
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

Like.associate = (models) => {
  Like.belongsTo(models.Post, { foreignKey: 'post_id' });
  Like.belongsTo(models.Member, { foreignKey: 'member_id' });
};

module.exports = Like;
