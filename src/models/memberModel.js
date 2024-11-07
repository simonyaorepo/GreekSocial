const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapterModel');
const Friendship = require('./friendshipModel');
const Post = require('./postModel');
const Message = require('./messageModel');
const Notification = require('./notificationModel');

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Chapter,
      key: 'id',
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  join_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'member',
  timestamps: false,
});

Member.associate = (models) => {
  Member.belongsTo(models.Chapter, { foreignKey: 'chapter_id' });
  Member.hasMany(models.Friendship, { foreignKey: 'member_id' });
  Member.hasMany(models.Friendship, { foreignKey: 'friend_id' });
  Member.hasMany(models.Post, { foreignKey: 'member_id' });
  Member.hasMany(models.Message, { foreignKey: 'sender_id' });
  Member.hasMany(models.Message, { foreignKey: 'receiver_id' });
  Member.hasMany(models.Notification, { foreignKey: 'user_id' });
};

module.exports = Member;
