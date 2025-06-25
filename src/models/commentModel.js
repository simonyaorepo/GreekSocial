// commentModel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comment = sequelize.define('Comment', {
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
    references: { model: 'member', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'comment',
  timestamps: true,
  underscored: true,
});

Comment.associate = (models) => {
  Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
  Comment.belongsTo(models.Member, { foreignKey: 'member_id' });
};

module.exports = Comment;
