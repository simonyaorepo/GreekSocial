const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Post = require('./postModel');
const Member = require('./memberModel');

const Comment = sequelize.define('Comment', {
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
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'comment',
  timestamps: false,
  underscored: true
});

Comment.associate = (models) => {
  Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
  Comment.belongsTo(models.Member, { foreignKey: 'member_id' });
};

module.exports = Comment;
