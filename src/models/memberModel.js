const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Chapter = require('./chapter');
const Post = require('./post');
const Message = require('./message');
const Notification = require('./notification');
const Like = require('./like');
const Friendship = require('./friendship');

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
    allowNull: false,
  },
}, {
  tableName: 'members',
  timestamps: false,
});

Member.belongsTo(Chapter, { foreignKey: 'chapter_id' });
Member.hasMany(Post);
Member.hasMany(Message);
Member.hasMany(Notification);
Member.hasMany(Like);
Member.hasMany(Friendship, { foreignKey: 'member_1_id' });
Member.hasMany(Friendship, { foreignKey: 'member_2_id' });

module.exports = Member;
